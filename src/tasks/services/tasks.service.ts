import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Task, UserTask } from "../schemas/tasks.schema";
import { Model } from "mongoose";
import { Cron, CronExpression } from "@nestjs/schedule";
import { TaskResponse, UserCompleteTask } from "../responses/tasks.response";
import { title } from "node:process";

@Injectable()
export class TaskService{
    constructor(
       @InjectModel(Task.name) private readonly taskModel:Model<Task> ,
       @InjectModel(UserTask.name) private readonly userTaskModel:Model<UserTask> ,
    ){}

    //BACKGROUND JOB TO CREATE DAILY TASK
    @Cron(CronExpression.EVERY_10_MINUTES)
    async createDailyTask(){
      console.log("running  a create job every 10 min");
      const today =new Date().toISOString().split('T')[0];
      //COUNT TODAYS TASK
      const taskCount = await this.taskModel.countDocuments({
        taskDate:today
      });

      if(taskCount>=5){
        console.log("today task already created");
        return;
      }
      //manage incase of server down
      const tasksToCreate=5-taskCount;
        //3. create tasks
        for(let i=0; i<tasksToCreate; i++){
            const   newTask = new this.taskModel({
                title: `Daily Task ${taskCount + i + 1}`,
                rewardAmount: 10,
                taskDate: today
            });

            await newTask.save();
        }
        console.log(`${tasksToCreate} tasks created for today.`);
    }    
    //fetch daily tasks 
    async getDailyTasks(){
        const today = new Date().toISOString().split('T')[0];

        const todayTasks = await this.taskModel.find({
            taskDate: today
        });
        const response: TaskResponse[] = todayTasks.map((task) => ({
            id: task._id.toString(),
            title: task.title,
            rewardAmount: task.rewardAmount,
            taskDate: task.taskDate,
        }));
        return response;
    }
    async completeTask(userId,taskId:string){
        //check if the task is  exist
        const task =await this.taskModel.findById(taskId)
        if(!task){
            throw new BadRequestException("task is not found")
        }
       //check if user already completed this task
       const taskCompleted = await this.userTaskModel.findOne({usersId:userId.id, taskId });
       if(taskCompleted)
       {
        throw new BadRequestException("task is already completed");
       }
       const completeTask= await this.userTaskModel.create({ usersId:userId.id,taskId})
       return{
          message: "Task completed successfully"
       }
    }
async myCompleteTask(currentUser) {
  const completedTasks = await this.userTaskModel
    .find({ usersId: currentUser.id })
    .populate('taskId');

  if (completedTasks.length === 0) {
    return  [];
  }
  const completeTaskRsponse :UserCompleteTask[]= completedTasks.map((item) => ({
    taskId: item?.taskId
  }));
  return completeTaskRsponse
}
}