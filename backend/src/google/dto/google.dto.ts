import { IsNotEmpty, IsString } from "class-validator";
import { TokenPair, User } from "@prisma/client";

export class LoginGoogleDto {
  @IsNotEmpty()
  token: string;

  @IsString()
  city: string;
}

export class GoogleTokenInfo {
  @IsString()
  email: string;
  @IsString()
  given_name: string;
  @IsString()
  family_name: string;
  @IsString()
  picture: string;
}

export class GoogleResponse {
  user: User;
  tokenPair: TokenPair;
}
