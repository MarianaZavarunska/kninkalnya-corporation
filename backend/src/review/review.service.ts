import { Injectable } from "@nestjs/common";

import { Review } from "@prisma/client";
import { PrismaService } from "../core/prisma.service";
import { CreateReview } from "./dto/review.dto";

@Injectable()
export class ReviewService {
  constructor(private prismaService: PrismaService) {}

  public async getAllReviews(): Promise<Review[]> {
    return this.prismaService.review.findMany({
      include: {
        user: true,
        restaurant: true,
      },
    });
  }

  public async CreateReview(review: CreateReview): Promise<Review> {
    return this.prismaService.review.create({
      data: {
        restaurantId: review.restaurantId,
        body: review.body,
        userId: review.userId,
        rating: review.rating,
      },
    });
  }
}
