import { Body, Controller, Get, Post } from "@nestjs/common";
import { OrderService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller("order")
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post()
  AddOrder(@Body() data: CreateOrderDto) {
    return this.orderService.createOrder(data);
  }
  @Get()
  GetOrder() {
    return this.orderService.getAll();
  }
}
