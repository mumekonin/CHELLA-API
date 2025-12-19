import { IS_ALPHA, IsAlpha, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  fullName: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  referredBy?: string;
}

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class updateProfileDto {
  @IsString()
 @IsOptional()
  fullName: string;
  @IsString()
  @IsOptional()
  username: string;
}