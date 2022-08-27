import { Injectable } from "@nestjs/common";
import { PrismaService } from "../core/prisma.service";
import { Order } from "@prisma/client";
import { DishService } from "../dish/dish.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Injectable()
export class OrderService {
  constructor(
    private prismaService: PrismaService,
    private dishService: DishService
  ) {}

  getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany();
  }

  async createOrder(data: CreateOrderDto): Promise<Order> {
    const arrDishId = [];
    for (const datum of data.dish) {
      for (let i = 0; i < datum.quantity; i++) {
        arrDishId.push(datum.dish.id);
      }
      const dishById = await this.dishService.getDishById(
        datum.dish.id.toString()
      );
      await this.dishService.updateDishByIdOnlyForCreateOrder(
        dishById.id.toString(),
        {
          quantity_sold: dishById.quantity_sold + Number(datum.quantity),
        }
      );
    }

    return this.prismaService.order.create({
      data: {
        ...data,
        userId: data.userId,
        totalPrice: data.totalPrice,
        dish: arrDishId,
      },
    });
  }
}
