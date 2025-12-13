import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Document } from "mongoose";
@Schema({ timestamps: true })//marks the class as a mangodb schema 
                      //timestamps: true   automatically add    ceratedAt and updatedAt       
export class User extends Document {  //define a mangos model named user
                        //Extends Document so each instance is a full Mongoose document.
  @Prop()        
  fullName: string

  @Prop()//is used to define the fileds 
  username: string;

  @Prop()
  password: string;

  @Prop()
  referredBy: string;

  @Prop()
  referralCode: string;

  @Prop()
  amount: number;

  @Prop()
  totalEarned: number;

  @Prop()
  totalReffered: number;
}
export const userSchema = SchemaFactory.createForClass(User);//generates the schema  from the class