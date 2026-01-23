import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class ExchangeRate extends Document {
    @Prop()
    baseCurrency: string;

    @Prop()
    usdRate: number;

    @Prop()
    eurRate: number;

    @Prop()
    etbRate: number;

    @Prop()
    exchangeDate: Date;
}

export const exchangeRateSchema = SchemaFactory.createForClass(ExchangeRate);