import {
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

@Injectable()
export class GoogleTokenMiddleware implements NestMiddleware {
  constructor(private google: OAuth2Client) {}

  public async use(req: Request, res: Response, next: NextFunction) {
    try {
      const google_token = req.body.token;

      if (!google_token) {
        next(
          new UnauthorizedException(
            HttpStatus.FORBIDDEN,
            "have no body with token"
          )
        );
      }

      const googleTokenInfo = await this.google.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_OAUTH_CLIENT_ID,
      });

      if (!googleTokenInfo) {
        next(
          new UnauthorizedException(HttpStatus.FORBIDDEN, "verify token failed")
        );
      }

      const payload = await googleTokenInfo.getPayload();

      if (!payload) {
        next(
          new UnauthorizedException(HttpStatus.FORBIDDEN, "verify token failed")
        );
      }

      next();
    } catch (e) {
      next(e.message);
    }
  }
}
