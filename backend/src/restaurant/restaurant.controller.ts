import { Controller, Get, Param } from "@nestjs/common";
import { RestaurantService } from "./restaurant.service";
@Controller("restaurants")
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  GetRestaurants() {
    return this.restaurantService.getRestaurants();
  }

  @Get("/:id")
  GetRestaurantByID(@Param("id") id: string) {
    return this.restaurantService.getRestaurantByID(id);
  }

  @Get("city/:city")
  GetRestaurantByCity(@Param("city") city: string) {
    return this.restaurantService.getRestaurantByCity(city);
  }

  @Get("get/cities")
  GetAllCities() {
    return this.restaurantService.getAllCities();
  }
}
