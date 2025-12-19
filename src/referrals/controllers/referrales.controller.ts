import { Controller, Get, Post, Req } from "@nestjs/common";
import { ReferralService } from "../services/referrales.service";
import { JwtAuthGuard } from "src/commons/guards/jwtauth.gourd";

@Controller('referrals')
export class ReferralsController {
   constructor(
     private readonly referralService:ReferralService
   ) {}
   @JwtAuthGuard()
   @Get('my-referrer')
   async getMyReferre(@Req() req: any){
     return await this.referralService.getMyReferreer(req.user);
   }
    @JwtAuthGuard()
    @Get('my-referred-users') 

    async getMyReferredUsers(@Req() req:any){
      return await this.referralService.getMyReferredUserss(req.user);
    }
}