import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Referral, ReferralSchema } from './schema/referrals.schema';
import { ReferralService } from './services/referrales.service';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Referral.name, schema: ReferralSchema }
      ]),
    ],
  
    controllers: [
  
    ],
  
    providers: [
        ReferralService
    ],
    exports: [ReferralService]
})
export class ReferralsModule {}
