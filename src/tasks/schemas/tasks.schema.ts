import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({timestamps:true})
export class Task extends Document{
    @Prop() title:string;
    @Prop() rewardAmount:number
    @Prop() taskDate:Date
}   export const  taskSchema =SchemaFactory.createForClass(Task);
@Schema({timestamps:true})
export class UserTask extends Document{
        @Prop() userId:string;
        @Prop() taskId:string;
        @Prop() isCompleted:boolean;
}export const  userTaskSchema =SchemaFactory.createForClass(UserTask);

//...patch complete tasks
//...get feach complte