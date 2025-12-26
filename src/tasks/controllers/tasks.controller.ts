import { Body, Controller, Get, Param, Patch, Req, UseGuards } from "@nestjs/common";
import { TaskService } from "../services/tasks.service";
import path from "node:path/win32";
import { JwtAuthGuard } from "src/commons/guards/jwtauth.gourd";

@Controller('tasks')
export class TaskController{
  constructor(
    private readonly taskService:TaskService
  ){}
  @Get('create-daily-tasks')
  async createDailyTask(){
    const  result = await this.taskService.createDailyTask();
    return result;
  }
 @Get('daily-tasks')
 async getDailyTask(){
  const result = await this.taskService.getDailyTasks()
  return result;
 }
 @JwtAuthGuard()
 @Patch('complete/:taskId')
 async completeTask( @Req() req: any, @Param('taskId') taskId:string){

   const userId=req.user;
   const result =await this.taskService.completeTask(userId,taskId);
   return result;
 } 
 @JwtAuthGuard()
 @Get('my-completed-tasks')
  async myCompletedTask(@Req() req:any){
   const currentUser=req.user;
   const result =await this.taskService.getUserComletedTasks (currentUser)
   return result
  }
}
