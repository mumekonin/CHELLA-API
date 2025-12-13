import * as jwt from 'jsonwebtoken'
export class CommonUtils{
  static generateReferralCode(length = 6): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code.toLocaleUpperCase();
  }
//jwt
  static generateJwtToken(jwtData){
    const generateJwtToken=jwt.sign(jwtData, "jkfjnksdfnsjkfnfsajfnabggfdgfnmmmmnnnsnjj",{expiresIn:'10m'});
    return generateJwtToken;
  }
}



