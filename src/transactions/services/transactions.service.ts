import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction } from "../schemas/transactions.schema";
import { Model } from "mongoose";
import { User } from "src/users/schemas/users.schema";
import { TransferDto } from "../dtos/transactions.dto";

@Injectable()
export class TransactionsService{
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModuls:Model<Transaction>,
 @InjectModel(User.name)
    private readonly usersModule:Model<User>
  ){}
  async makeTransaction(currentUser:any, transferDto: TransferDto){
      //check if the reciver exists
            const reciverExists = await this.usersModule.findOne({
              username: transferDto.receiverUsername
            });
            if (!reciverExists) {
              throw new BadRequestException("reciver does not found")
            }
     //check current user if exist
           const currentUserExists= await this.usersModule.findById(currentUser.id);
           if(!reciverExists){
            throw new BadRequestException("sender does not exists")
           }

           if(reciverExists.id.toString()===currentUserExists?._id.to){
            throw new BadRequestException("impossible  to send for your self ")
           }
         
           if(currentUser.amount<=10){
            throw new BadRequestException("you have insufficient balance")
           }
           reciverExists.totalEarned += transferDto.amount;
           await reciverExists.save();
          
           currentUser.totalEarned-=transferDto.amount;

           await currentUserExists?.save();
           

  }
}