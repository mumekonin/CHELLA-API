import { applyDecorators, UseGuards } from "@nestjs/common";
import { AuthGuard as passportAuthGuard } from "@nestjs/passport";  

export function JwtAuthGuard(type:string| string[]='jwt'){
  return applyDecorators ( UseGuards(passportAuthGuard(type)),)
}