import { BadRequestException, Get, Injectable, Req } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Transaction } from "../schemas/transactions.schema";
import { Model, Types } from "mongoose";
import { User } from "src/users/schemas/users.schema";
import { TransferDto } from "../dtos/transactions.dto";
import { send } from "node:process";
import { TransactionResponse } from "../responses/transactions.response";

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModuls: Model<Transaction>,
    @InjectModel(User.name)
    private readonly usersModule: Model<User>
  ) { }
  async makeTransaction(currentUser: any, transferDto: TransferDto) {
    //check if the reciver exists
    const reciverExists = await this.usersModule.findOne({
      username: transferDto.receiverUsername
    });
    if (!reciverExists) {
      throw new BadRequestException("reciver does not found")
    }
    //check current user if exist
    const senders = await this.usersModule.findById(currentUser.id);
    if (!senders) {
      throw new BadRequestException("sender does not exists")
    }
    //3. prevent self transfer
    if (reciverExists.id.toString() === senders?._id.toString()) {
      throw new BadRequestException("You cannot transfer to yourself. ")
    }
    //4. check if sender has sufficient balance    
    if (senders.totalEarned < transferDto.amount) {
      throw new BadRequestException("you have insufficient balance");
    }
    //5. deduct amount from sender
    senders.totalEarned -= transferDto.amount;
    await senders.save();
    //6. add amount to reciver
    reciverExists.totalEarned += transferDto.amount;
    await reciverExists.save();
    //create transaction instance
    const newTransaction = await this.transactionModuls.create({
      senderId: senders._id,
      reciverId: reciverExists._id,
      amount: transferDto.amount,
      status: "completed"
    })

    //save transaction
    const savedTransaction = await newTransaction.save();

    const response: TransactionResponse = {
      id: savedTransaction._id.toString(),
      senderFullName: senders.fullName,
      senderUsername: senders.username,
      receiverFullName: reciverExists.fullName,
      receiverUsername: reciverExists.username,
      amount: savedTransaction.amount,
      currency: savedTransaction.currency,
      status: savedTransaction.status,
      createdAt: savedTransaction.createdAt,
    }
    return response;
  }
  async getAllTransactions(currentUser: any) {
    const transactions = await this.transactionModuls.find({
      $or: [
        { senderId: new Types.ObjectId(currentUser.id) }, { receiverId: new Types.ObjectId(currentUser.id) }
      ]
    }).sort({ createdAt: -1 })
      .populate('senderId', 'username fullname').populate('reciverId', 'username fullname');
    if (transactions.length === 0) {
      return [];
    } const transactionResponses: TransactionResponse[] = transactions.map(transaction => {
      const sender = transaction.senderId as any;
      const receiver = transaction.reciverId as any; return {
        id: transaction._id.toString(),
        senderFullName: sender.fullname,
        senderUsername: sender?.username,
        receiverFullName: receiver?.fullname,
        receiverUsername: receiver?.username,
        amount: transaction.amount,
        currency: transaction.currency,
        status: transaction.status,
        createdAt: transaction.createdAt,
      };
    });
    return transactionResponses;
  }
}
