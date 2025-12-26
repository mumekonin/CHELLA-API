import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, transactonSchema } from './schemas/transactions.schema';

@Module({
  imports: [
        MongooseModule.forFeature([
          { name: Transaction.name, schema: transactonSchema }
        ]),
      ],
      controllers: [],
    
      providers: [],
  })
export class TransactionsModule {}
