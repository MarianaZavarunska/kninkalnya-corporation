import { Module } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
import { RestaurantController } from "./restaurant.controller";
import { PrismaService } from "../core/prisma.service";
import { S3Service } from "../s3/s3.service";

@Module({
  providers: [RestaurantService, PrismaService, S3Service],
  controllers: [RestaurantController],
})
export class RestaurantModule {}
