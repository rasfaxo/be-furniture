import cryptoJs from "crypto-js";
import jwt, { JwtPayload } from "jsonwebtoken";

class JWT {
  private jwtInstance: any;

  constructor(jwtInstance: any) {
    this.jwtInstance = jwtInstance;
  }

  private async decriptToken(token: string): Promise<string> {
    const encryptedToken = token.split(" ")[1];
    return cryptoJs.AES.decrypt(
      encryptedToken,
      process.env.API_SECRET as string
    ).toString(cryptoJs.enc.Utf8);
  }

  public async decodeJWT(token: string): Promise<string | JwtPayload> {
    const decriptToken = await this.decriptToken(token);
    return this.jwtInstance.verify(
      decriptToken,
      process.env.API_SECRET as string
    );
  }
}

const tokenize = new JWT(jwt);

export default tokenize;
