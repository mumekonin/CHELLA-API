import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Task, taskSchema, UserTask, userTaskSchema } from "./schemas/tasks.schema";
import { TaskController } from "./controllers/tasks.controller";
import { TaskService } from "./services/tasks.service";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Task.name, schema: taskSchema },
      { name: UserTask.name, schema:userTaskSchema }
  
    ]),
  ],

  controllers: [
   TaskController
  ],

  providers: [
    TaskService
  ]
})
export class TaskModule {}