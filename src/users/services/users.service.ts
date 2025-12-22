import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dtos/users.dto"
import { LogInDto } from "../dtos/users.dto"
import { updateProfileDto } from "../dtos/users.dto"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../schemas/users.schema";
import { CommonUtils } from "src/commons/utils";
import * as bcrypt from "bcrypt";
import { UserResponse } from "../responses/users.response";
import { ReferralService } from "src/referrals/services/referrales.service";
@Injectable()
export class UsersSrevice {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly referralService: ReferralService
  ) { }
  // get a single user
  async getUserProfile(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException("user does not found");
    }

    const userResponse: UserResponse = {
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      amount: user.amount,
      totalEarned: user.totalEarned,
      totalReffered: user.totalReffered
    }
    return userResponse;
  }
  async registerUser(createUserDto: CreateUserDto) {
    //check if the user exist
    const existingName = await this.userModel.findOne({
      username: createUserDto.username.toLowerCase()
    });
    if (existingName) {
      throw new BadRequestException("user already exists with this username")
    }
    let referringUser = null as any;
    if (createUserDto.referredBy) {
      referringUser = await this.userModel.findOne({ referralCode: createUserDto.referredBy });

      if (!referringUser) {
        throw new BadRequestException('Invalid referral code.');
      }
    }

    //hash password
    const hashedPwd = await bcrypt.hash(createUserDto.password, 10)

    //generate refferral
    const referralCode = CommonUtils.generateReferralCode();

    //!increase the amount of  for reffering user
    if (createUserDto.password) {
      const refferingUser = await this.userModel.findOne({
        referralCode: createUserDto.referredBy
      });
      if (refferingUser) {
        await this.userModel.findByIdAndUpdate(
          refferingUser._id, {
          totalEarned: refferingUser.totalEarned + 20,
          amount: refferingUser.amount + 20,
          totalReffered: refferingUser.totalEarned + 1

        });
      }
    }
    // prepare an instance to save db
    const newUser = new this.userModel({
      fullName: createUserDto.fullName,
      username: createUserDto.username,
      password: hashedPwd,
      referralCode: referralCode,
      referredBy: createUserDto.referredBy || null,
      amount: 100,
      totalEarned: 100,
      totalReffered: 0
    });

    //save to db
    const savedUser = await newUser.save();

    //! We will implement a code to increase amount for referering users
    if (referringUser) {
      await this.referralService.createReferralTracking(
        referringUser._id.toString(),
        savedUser._id.toString()
      )
      await this.userModel.findByIdAndUpdate(referringUser._id, {
        totalEarned: referringUser.totalEarned + 20,
        amount: referringUser.amount + 20,
        totalReffered: referringUser.totalReffered + 1
      });
    }

    //map to our user response  interceptor
    const userResponse: UserResponse = {
      id: savedUser._id.toString(),
      fullName: savedUser.fullName,
      username: savedUser.username,
      referralCode: savedUser.referralCode,
      referredBy: savedUser.referredBy,
      amount: savedUser.amount,
      totalEarned: savedUser.totalEarned,
      totalReffered: savedUser.totalReffered
    }
    return userResponse;
  }

  async updateProfile(id: string, updateProfileDto: updateProfileDto) {
    //chacking the user in the table
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new BadRequestException("user is not found with this id ");
    }
    //prparing things
    if (updateProfileDto.fullName) {
      user.fullName = updateProfileDto.fullName
    }

    if (updateProfileDto.username) {
      //chaking if the user is exist
      const existingUsername = await this.userModel.findOne({
        username: updateProfileDto.username.toLowerCase()
      })
      if (existingUsername && existingUsername.username !== user.username) {
        throw new BadRequestException("username already found")
      }
      user.username = updateProfileDto.username;
    }
    //saving to the database
    const updateUser = await user.save();
    //using our interceptor
    const userResponse: UserResponse = {
      id: updateUser._id.toString(),
      fullName: updateUser.fullName,
      username: updateUser.username,
      referralCode: updateUser.referralCode,
      referredBy: updateUser.referredBy,
      amount: updateUser.amount,
      totalEarned: updateUser.totalEarned,
      totalReffered: updateUser.totalReffered
    }
    return userResponse;
  }
  async getAllUsers() {
    //fetching all users from the db
    const users = await this.userModel.find()
    //if not users found
    if (!users || users.length === 0) {
      return [];
    }
    //using our respones interceptor
    const userResponse: UserResponse[] = users.map(user => ({
      id: user._id.toString(),
      fullName: user.fullName,
      username: user.username,
      referralCode: user.referralCode,
      referredBy: user.referredBy,
      amount: user.amount,
      totalEarned: user.totalEarned,
      totalReffered: user.totalEarned

    }))
    return userResponse;
  }
  async userLogin(logInDto: LogInDto) {
    const user = await this.userModel.findOne({
      username: logInDto.username.toLowerCase()
    });

    if (!user) {
      throw new BadRequestException("invalid username provided");
    }
    //comperd password 
    const isPwdMatch = await bcrypt.compare(logInDto.password, user.password);
    if (!isPwdMatch) {
      throw new BadRequestException("incorrect password provided");
    }

    const jwtData = {
      id: user._id.toString(),
      fullname: user.fullName,
      username: user.username
    };
    const generatedToken = CommonUtils.generateJwtToken(jwtData);
    return {
      assesToken: generatedToken,
    }
  }

  async getMyReferralCode(currentUser) {
    const user = await this.userModel.findById(currentUser.id);
    if (!user) {
      throw new BadRequestException("user not found");
    }
    const userResponse: UserResponse = {
      referralCode: user.referralCode
    }
    return userResponse

  }
  //reward mangement sevice
 async addTaskRewardToUser(currentUserId:string, rewardAmount:number){
        const user = await  this.userModel.findById(currentUserId);
        if(!user){
          throw new BadRequestException("user is not found");
        }
        user.totalEarned+=rewardAmount;
        await user.save();
 }
}