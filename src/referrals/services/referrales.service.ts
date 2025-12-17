import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Referral } from "../schema/referrals.schema";
import { Model, Types } from "mongoose"; 

@Injectable()
export class ReferralService {
    constructor(
      @InjectModel(Referral.name)
      private readonly referralModel: Model<Referral>,  
    ) {}  

    async  createReferralTracking(refferrerId: string, referrerdUserId: string){
        //prevent self referral
        if(refferrerId === referrerdUserId){
          throw new BadRequestException("You cannot refer yourself");
        };

        //lets check if the referral already exists to prvent duplicate referrals
        const refExists = await this.referralModel.exists({
          referrerdUserId:referrerdUserId
        });
        if(refExists){
          throw new BadRequestException("user already referred");
        }
        const refferal = await this.referralModel.create({
          refferrerId: new Types.ObjectId(refferrerId),
          referrerdUserId: new Types.ObjectId(referrerdUserId)
        });
        return refferal.save();
    }
  }