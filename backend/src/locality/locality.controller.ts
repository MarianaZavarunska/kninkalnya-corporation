import { Controller, Get } from "@nestjs/common";
import { LocalityService } from "./locality.service";

@Controller("locality")
export class LocalityController {
  constructor(private localityService: LocalityService) {}

  @Get()
  GetLocality() {
    return this.localityService.getLocality();
  }
}
