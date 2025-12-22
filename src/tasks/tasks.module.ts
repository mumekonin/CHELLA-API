import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, taskSchema, UserTask, userTaskSchema } from "./schemas/tasks.schema";
import { TaskController } from "./controllers/tasks.controller";
import { TaskService } from "./services/tasks.service";
import { User, userSchema } from "src/users/schemas/users.schema";
import { UsersSrevice } from "src/users/services/users.service";
import { ReferralService } from "src/referrals/services/referrales.service";
import { Referral, ReferralSchema } from "src/referrals/schema/referrals.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: UserTask.name, schema:userTaskSchema },
      { name: User.name, schema:userSchema },
      { name: Referral.name, schema: ReferralSchema }
  
    ]),
   
  ],

  controllers: [
   TaskController
  ],

  providers: [
    TaskService,
    UsersSrevice,
    ReferralService
  ]
})
export class TaskModule {}