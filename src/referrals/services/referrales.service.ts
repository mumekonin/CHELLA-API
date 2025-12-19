import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Referral } from "../schema/referrals.schema";
import { Model, Types } from "mongoose"; 
import { ReferralReponse, ReferredUserResponse } from "../responses/referrales.response";

@Injectable()
export class ReferralService {
    constructor(
      @InjectModel(Referral.name)//used to inject mangos moel into the service
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

    async getMyReferreer(currentUser){
      const referral = await this.referralModel
      .findOne({referrerdUserId: new Types.ObjectId(currentUser.id)})
      .populate('refferrerId','username fullName createdAt')

        if(!referral){
          throw new BadRequestException("you don't have a referrer");
        }
        const referrer = referral.refferrerId  as any;

        console.log("referrel found",referral);
         console.log("referrer found",referrer);

         //use intercpeter
         const referrerUser :ReferralReponse={
          id:referral._id?.toString(),
          referrerId:referrer?._id.toString(),
          referrerFullName:referrer?.fullName,
          referrerUsername:referrer?.username
         };
         return referrerUser;
        }
    async getMyReferredUserss(currentUser){
      const referrals = await this.referralModel
      .find({refferrerId: new Types.ObjectId(currentUser.id)})
      .populate('referrerdUserId','username fullName createdAt')

      if(referrals.length === 0){ 
        return [];
      }
      const referredRsponse :ReferredUserResponse[]= referrals.map(referral=>{
        const referredUser =referral.referrerdUserId as any;
        return{
               id:referral._id?.toString(),
                referredUserId:referredUser?._id.toString(),
                referredFullName:referredUser?.fullName,
                referredUsername:referredUser?.username
        }
        
      })
      return referredRsponse;
    }
  }