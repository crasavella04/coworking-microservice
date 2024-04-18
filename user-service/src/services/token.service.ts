import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IPayloadToken } from 'src/interfaces/IPayloadToken';
import { TokenImplements } from 'src/interfaces/implements/token.implements';

@Injectable()
export class TokenService implements TokenImplements {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  createTokens(payload: IPayloadToken) {
    const access = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET_ACCESS_TOKEN'),
      expiresIn: '1h',
    });

    const refresh = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      expiresIn: '60d',
    });

    return { access, refresh };
  }

  decodeAccessToken(token: string) {
    try {
      const data: IPayloadToken = this.jwtService.verify(token, {
        secret: this.configService.get('SECRET_ACCESS_TOKEN'),
      });

      return data;
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  decodeRefreshToken(token: string) {
    try {
      const data: IPayloadToken = this.jwtService.verify(token, {
        secret: this.configService.get('SECRET_REFRESH_TOKEN'),
      });

      return data;
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
