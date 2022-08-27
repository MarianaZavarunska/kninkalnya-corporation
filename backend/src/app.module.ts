import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JwtModule, JwtService } from "@nestjs/jwt";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaService } from "./core/prisma.service";
import { AdminModule } from "./admin/admin.module";
import { DishModule } from "./dish/dish.module";
import { S3Module } from "./s3/s3.module";
import { AccessTokenMiddleware } from "./auth/middleware/access-token.middleware";
import { TokenService } from "./auth/token/token.service";
import { LocalityModule } from "./locality/locality.module";
import { RestaurantModule } from "./restaurant/restaurant.module";
import { OrderModule } from "./order/order.module";
import { GoogleModule } from "./google/google.module";
import { AdminMiddleware } from "./auth/middleware/admin_middleware";
import { GoogleTokenMiddleware } from "./auth/middleware/google_middleware";
import { OAuth2Client } from "google-auth-library";
import { ReviewModule } from "./review/review.module";
import { PromotionsModule } from "./promotions/promotions.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    AdminModule,
    DishModule,
    S3Module,
    JwtModule,
    LocalityModule,
    RestaurantModule,
    OrderModule,
    GoogleModule,
    ReviewModule,
    PromotionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    TokenService,
    JwtService,
    OAuth2Client,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AccessTokenMiddleware).forRoutes("users", "admin");
    consumer.apply(AdminMiddleware).forRoutes("admin");
    consumer.apply(GoogleTokenMiddleware).forRoutes("auth/google/login");
  }
}
