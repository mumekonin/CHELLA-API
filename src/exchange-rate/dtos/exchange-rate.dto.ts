import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RateConversionDto { 
     @IsNumber()
     @IsNotEmpty()
      amount: number;
      @IsEnum(['USD', 'EUR', 'ETB'], {message : 'Currency must be one of USD, EUR, ETB'})
      @IsString()
      fromCurrency: string; 

      @IsEnum(['USD', 'EUR', 'ETB'], {message : 'Currency must be one of  the USD, EUR, ETB'})
      @IsString()
      toCurrency: string;
   }