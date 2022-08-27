import { Controller, Get, Param } from "@nestjs/common";
import { DishService } from "./dish.service";

@Controller("dish")
export class DishController {
  constructor(private dishService: DishService) {}

  @Get()
  GetAllDishes() {
    return this.dishService.getAllDishes();
  }

  @Get("popular/:dishId")
  GetDishById(@Param("dishId") dishId: string) {
    return this.dishService.getDishById(dishId);
  }

  @Get("locality/:id")
  getDishByLocality(@Param("id") id: string) {
    return this.dishService.dishByLocalityId(id);
  }
}
