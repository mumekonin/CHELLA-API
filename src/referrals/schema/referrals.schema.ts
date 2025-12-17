import { Prop, Schema ,SchemaFactory} from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";
@Schema({ timestamps: true })
export class Referral extends Document {
  @Prop({type:Types.ObjectId, ref:User.name})
       refferrerId: Types.ObjectId; 
  @Prop({type:Types.ObjectId, ref:User.name})
     referrerdUserId: Types.ObjectId;
}
export const ReferralSchema = SchemaFactory.createForClass(Referral); 