import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";

import { LoginGoogleDto } from "./dto/google.dto";
import { GoogleService } from "./google.service";

@Controller("auth/google")
export class GoogleController {
  constructor(private readonly googleService: GoogleService) {}

  @Post("login")
  public async userGoogleLogin(@Body() body: LoginGoogleDto) {
    return this.googleService.userGoogleLogin(body);
  }

  @Get("geolocation")
  public userGoogleLocation(@Query() query: { lat: string; lng: string }) {
    return this.googleService.userGoogleLocation(query.lat, query.lng);
  }
}
