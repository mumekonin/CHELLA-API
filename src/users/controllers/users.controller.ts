import { Body, Controller, Get, Param, Patch, Post, Req } from "@nestjs/common";
import { CreateUserDto } from "../dtos/users.dto"
import { UsersSrevice } from "../services/users.service"
import { LogInDto } from "../dtos/users.dto"
import { updateProfileDto } from "../dtos/users.dto"
import { JwtAuthGuard } from "src/commons/guards/jwtauth.gourd";


@Controller('users')
export class UsersConteroller {
  constructor(
    private readonly userService: UsersSrevice
  ) { }

  @Post('/registor')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const result = await this.userService.registerUser(createUserDto)
    return result
  }

  @Patch("/update-profile/:id")

  async updateProfile(@Param("id") id: string, @Body() updateProfileDto: updateProfileDto, @Req() req: any
  ) {
    console.log('Methods:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('Query:', req.query);


    const result = await this.userService.updateProfile(id, updateProfileDto)
    return result
  }
  @Get('/get-profile/:id')
  async getUserProfile(@Param("id") id: string) {
    const result = await this.userService.getUserProfile(id)
    return result;
  }

  @JwtAuthGuard()
  @Get('/getAllUsers')
  async getAllUsers() {
    const result = await this.userService.getAllUsers();
    return result;
  }
  @Post('/login')
  async loginUser(@Body() logInDto: LogInDto) {
    const result = await this.userService.userLogin(logInDto)
    return result;
  }
  @JwtAuthGuard() 
  @Get('/my-referral-code')
  async getMyReferralCode(@Req() req:any){
    const currentUser = req.user;

    console.log('Methods:', req.method);
    console.log('URL:', req.originalUrl);
    console.log('Headers:', req.headers);
    console.log('Params:', req.params);
    console.log('Body:', req.body);
    console.log('Query:', req.query);
    console.log("user info:",req.user);

    const result = await this.userService.getMyReferralCode(currentUser);
    return result;
  }
}






