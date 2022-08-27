import { Module } from "@nestjs/common";
import { PrismaService } from "../core/prisma.service";

import { ReviewController } from "./review.controller";
import { ReviewService } from "./review.service";

@Module({
  providers: [ReviewService, PrismaService],
  controllers: [ReviewController],
})
export class ReviewModule {}
