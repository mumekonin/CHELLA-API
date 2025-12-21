import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReferralsModule } from './referrals/referrals.module';
import { TransactionsModule } from './transactions/transactions.module';
import { ExchangeRateModule } from './exchange-rate/exchange-rate.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './commons/guards/jwt.strategy';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskModule } from './tasks/tasks.module';

@Module({
  imports: [
   ConfigModule.forRoot({
    isGlobal:true
  }),
    MongooseModule.forRoot("mongodb+srv://mumekonin:347548@cluster0.d3ahpuk.mongodb.net/chella_db?retryWrites=true&w=majority"),
    UsersModule, 
    ReferralsModule,
     TransactionsModule, 
     TaskModule,
     ExchangeRateModule,
     ScheduleModule.forRoot()
    ],
  controllers: [AppController],
  providers: [AppService,
    JwtStrategy
  ],
})
export class AppModule { }
