import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactonSchema } from './schemas/transactions.schema';
import { TransactionsService } from './services/transactions.service';
import { TransactionResponse } from './responses/transactions.response';
import { User, userSchema } from 'src/users/schemas/users.schema';
import { TransactionsController } from './controllers/transactions.controller';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Transaction.name, schema: transactonSchema },
          { name:User.name,schema:userSchema}
        ]),
      ],
      
      controllers: [TransactionsController],
    
      providers: [TransactionsService],
  })
export class TransactionsModule {}
