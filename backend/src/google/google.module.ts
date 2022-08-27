import { Module } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { HttpModule } from "@nestjs/axios";

import { UserService } from "../user/user.service";
import { PrismaService } from "../core/prisma.service";
import { TokenService } from "../auth/token/token.service";
import { GoogleService } from "./google.service";
import { GoogleController } from "./google.controller";
import { S3Service } from "../s3/s3.service";

@Module({
  controllers: [GoogleController],
  providers: [
    GoogleService,
    JwtService,
    TokenService,
    UserService,
    PrismaService,
    S3Service,
  ],
  imports: [
    JwtModule.register({
      secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET as string,
    }),
    HttpModule,
  ],
})
export class GoogleModule {}
