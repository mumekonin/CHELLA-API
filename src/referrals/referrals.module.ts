import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Referral, ReferralSchema } from './schema/referrals.schema';
import { ReferralService } from './services/referrales.service';
import { ReferralsController } from './controllers/referrales.controller';

@Module({
    imports: [
      MongooseModule.forFeature([
        { name: Referral.name, schema: ReferralSchema }
      ]),
    ],
    controllers: [
       ReferralsController
    ],
  
    providers: [
        ReferralService
    ],
    exports: [ReferralService]
})
export class ReferralsModule {}
