import { Module } from '@nestjs/common';
import { UsersConteroller } from './controllers/users.controller';
import { UsersSrevice } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: userSchema }
    ])
  ],

  controllers: [
    UsersConteroller
  ],

  providers: [
    UsersSrevice
  ]
})
export class UsersModule { }
