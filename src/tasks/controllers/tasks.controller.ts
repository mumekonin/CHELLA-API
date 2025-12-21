import { Controller, Get } from "@nestjs/common";
import { TaskService } from "../services/tasks.service";

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
}
