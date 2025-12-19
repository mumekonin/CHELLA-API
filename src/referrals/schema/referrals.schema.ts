import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";
@Schema({ timestamps: true })
export class Referral extends Document { //extends Document means each instacne of referral  repersents a mangodb document
                                        //it built mangoose method like .save(), .toObject()...
  @Prop({type:Types.ObjectId, ref:User.name})  //type: Types.ObjectId -> the value stored is a MongoDB ObjectId
       refferrerId: Types.ObjectId; 
  @Prop({type:Types.ObjectId, ref:User.name})
     referrerdUserId: Types.ObjectId;
}
export const ReferralSchema = SchemaFactory.createForClass(Referral); 