import { Controller, Get,Post,Body } from "@nestjs/common";
import { ExchangeRatesService } from "../services/exchange-rate.service";
import { RateConversionDto } from "../dtos/exchange-rate.dto";

@Controller("exchange-rate")
export class ExchangeRateController {
 constructor(
  private readonly exchangeRateService:ExchangeRatesService
 ){}

 @Get('today-rate')
 async getTodayRate(){
   const result= await this.exchangeRateService.getTodayExchangeRate();
   return result;
 }
 @Post('convert-rate')
  async convertRate(@Body()rateConversionDto:RateConversionDto){
        const result = await this.exchangeRateService.currencyConversion(rateConversionDto);
        return result;
    } 
 }