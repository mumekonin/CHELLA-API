import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {//creates a custom class that tells NestJS how to validate JWT tokens
    constructor(){
        const strategyOptions: StrategyOptions = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),//tell the passport where to find the token
            ignoreExpiration: false,//reject expired token automaticaliy 
            secretOrKey: "jkfjnksdfnsjkfnfsajfnabggfdgfnmmmmnnnsnjj",//it used to verify the jwt signture
        };
        super(strategyOptions); //send the config  passport stategy constructors 
    }
    async validate(payload: any){
        const { exp, iat, nbf, sub, ...userInfo } = payload;
        console.log("🚀 ~ JwtStrategy ~ validate ~ rest:", userInfo)
        return userInfo;
    }
}
