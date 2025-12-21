export class TaskResponse{
  id?:string;
  title?:string;
  rewardAmount?:number;
  taskDate?:Date;
}

export class UserCompleteTask{
  taskId?:string;
}