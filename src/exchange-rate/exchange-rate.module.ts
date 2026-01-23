import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRate, exchangeRateSchema } from './schemas/rates.shema';
import { HttpModule } from '@nestjs/axios';
import { ExchangeRatesService } from './services/exchange-rate.service';
import { ExchangeRateController } from './controllers/exchange-rate.controller';


@Module({
    imports: [
        MongooseModule.forFeature([
            {name: ExchangeRate.name, schema: exchangeRateSchema}
        ]),

        HttpModule
    ],

    controllers: [ ExchangeRateController],

    providers: [
        ExchangeRatesService
    ]
})
export class ExchangeRatesModule {}
