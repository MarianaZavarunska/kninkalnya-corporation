import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "@prisma/client";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  // @UseGuards(AuthorizedGuard)
  GetUsers() {
    return this.userService.getAll();
  }

  @Get("/:id")
  getUserById(@Param("id") id: string) {
    return this.userService.getUserById(id);
  }

  @Get("currentUser/:accessToken")
  getUserByToken(@Param("accessToken") accessToken: string) {
    return this.userService.getUserByToken(accessToken);
  }

  @Put("/:id")
  @UseInterceptors(FileInterceptor("avatar"))
  updateUserById(
    @UploadedFile() file,
    @Body() user: Partial<User>,
    @Param("id") id: string
  ) {
    return this.userService.updateUserById(file, user, id);
  }

  @Get("frequentOrder/:userId")
  getFrequentOrder(@Param("userId") userId: string): Promise<number[]> {
    return this.userService.getOrdersArrayByUserId(userId);
  }
}
