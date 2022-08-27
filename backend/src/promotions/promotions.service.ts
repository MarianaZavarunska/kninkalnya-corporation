import { Injectable } from "@nestjs/common";
import { PrismaService } from "../core/prisma.service";
import { Promotions } from "@prisma/client";
import { CreatePromotionDto } from "./dto/create-promotion.dto";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class PromotionsService {
  constructor(private prismaService: PrismaService, private s3: S3Service) {}

  public async createPromotion(
    promotion: Promotions,
    file
  ): Promise<Promotions> {
    const img = await this.s3.uploadFile(file);
    return this.prismaService.promotions.create({
      data: {
        ...promotion,
        image: img.Location,
        descriptions: promotion.descriptions,
      },
    });
  }

  public async getAllPromotions(): Promise<Promotions[]> {
    return this.prismaService.promotions.findMany();
  }
}
