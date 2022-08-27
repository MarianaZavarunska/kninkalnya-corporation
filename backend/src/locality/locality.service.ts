import { Injectable } from "@nestjs/common";
import { Locality } from "@prisma/client";
import { PrismaService } from "../core/prisma.service";
import { S3Service } from "../s3/s3.service";

@Injectable()
export class LocalityService {
  constructor(private prismaService: PrismaService, private s3: S3Service) {}

  async getLocality(): Promise<Locality[]> {
    return this.prismaService.locality.findMany();
  }

  async addLocality(data: Locality, file): Promise<Locality> {
    const img = await this.s3.uploadFile(file);
    return this.prismaService.locality.create({
      data: {
        ...data,
        image: img.Location,
      },
    });
  }

  public async updateLocalityById(
    data: Partial<Locality>,
    id: string,
    file
  ): Promise<Locality> {
    if (file) {
      const img = await this.s3.uploadFile(file);
      return this.prismaService.locality.update({
        where: { id: Number(id) },
        data: { ...data, image: img.Location },
      });
    }
    return this.prismaService.locality.update({
      where: { id: Number(id) },
      data: data,
    });
  }

  public async deleteById(id: string) {
    return this.prismaService.locality.delete({ where: { id: Number(id) } });
  }
}
