import { IsNumber, IsString, isString, Max, Min } from "class-validator";

export class TransferDto{
  @IsString()
  receiverUsername:string
  @IsNumber()
  @Min(10,{message:"min amount to transefer is 10"})
  @Max(150,{message:"max amount to transfer is 150"})
  amount:number;
}