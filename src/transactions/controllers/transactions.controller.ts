import { Body, Controller, Post, Req } from "@nestjs/common";
import { TransactionsService } from "../services/transactions.service";
import { TransferDto } from "../dtos/transactions.dto";
import { JwtAuthGuard } from "src/commons/guards/jwtauth.gourd";

@Controller("transfer")
export class TransactionsController {
   constructor(
    private readonly transactionsService: TransactionsService
   ) { }  
   @JwtAuthGuard()
   @Post("make-transaction")
   async makeTransaction(@Req() req:any, @Body("make-transaction") transferDto:TransferDto){ 
    const currentUser = req.user;
    const result = await this.transactionsService.makeTransaction(currentUser,transferDto);
    return result;
   } 
}