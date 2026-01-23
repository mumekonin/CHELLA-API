import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose"; 
import { Model } from "mongoose";
import { HttpService } from "@nestjs/axios";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ExchangeRate } from "../schemas/rates.shema";
import { RateConversionDto } from "../dtos/exchange-rate.dto";
import { ConversionRespose, RateResponse } from "../responses/exchange-rate.response";
@Injectable()
export class ExchangeRatesService {
    constructor(
        @InjectModel(ExchangeRate.name) private readonly rateModel: Model<ExchangeRate>,
        private readonly httpService: HttpService
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async sendRequestAndUpdateRates(){
        try {

                 const today = new Date().toISOString().split('T')[0];

                 const existingRate = await this.rateModel.findOne({
                    exchangeDate: today
                });

                if(existingRate){
                    console.log("Today's exchange rate already exists");
                    return;
                }

            //let's send request
            const response = await this.httpService.axiosRef.get(
                `https://v6.exchangerate-api.com/v6/4349e5530052ffc54d8be23a/latest/ETB`,
            );
            if(response.data.result === "success"){
                
                const etbToUsd = response.data.conversion_rates.USD;
                const etbToEur = response.data.conversion_rates.EUR;
                const etb = response.data.conversion_rates.ETB;


                //if not create new rate for today
                const newRate = await this.rateModel.create({
                    usdRate: etbToUsd,
                    eurRate: etbToEur,
                    etbRate: etb,
                    exchangeDate: today
                });

                await newRate.save();
            }

        } catch(error){
            console.log(error)
            throw new Error("Failed to fetch excahnge rate.")
        }
    }
    async getTodayExchangeRate(){
        const today = new Date().toISOString().split('T')[0];

        const todayRate = await this.rateModel.findOne({
            exchangeDate: today
        });

        if(!todayRate){
            throw new Error("Today's exchange rate not found.");
      }
        const response :RateResponse={
          id: todayRate._id.toString(),
          usdRate: todayRate.usdRate,
          eurRate: todayRate.eurRate,
          etbRate: todayRate.etbRate,
          exchangeDate: todayRate.exchangeDate
        }
        return response;
      }
    //service for conversion
    async currencyConversion(rateConversionDto:RateConversionDto){
      //fetching today exchange rate
      const todayRate = await this.getTodayExchangeRate();

      let convertedAmount: number;
       if(rateConversionDto.fromCurrency === rateConversionDto.toCurrency){
          convertedAmount = rateConversionDto.amount;
       }

       //ETB to USD
       else if(rateConversionDto.fromCurrency === 'ETB' && rateConversionDto.toCurrency === 'USD'){
          convertedAmount = rateConversionDto.amount * todayRate.usdRate;
       }

       else if(rateConversionDto.fromCurrency === 'ETB' && rateConversionDto.toCurrency === 'EUR'){
          convertedAmount = rateConversionDto.amount * todayRate.eurRate;
       }else{
           throw new BadRequestException("Conversion from USD or EUR to ETB is not supported yet.");
       }

       const response:ConversionRespose={
          fromCurrency: rateConversionDto.fromCurrency,
          toCurrency: rateConversionDto.toCurrency,
          Amount: convertedAmount
       }
        return response;
    }

}