import { Module } from "@nestjs/common";
import { PromotionsController } from "./promotions.controller";
import { PromotionsService } from "./promotions.service";
import { PrismaService } from "../core/prisma.service";
import { S3Service } from "../s3/s3.service";

@Module({
  controllers: [PromotionsController],
  providers: [PromotionsService, PrismaService, S3Service],
})
export class PromotionsModule {}
