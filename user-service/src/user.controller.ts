import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @MessagePattern('auth.login.user')
  async login(@Payload() message: CreateUserDto) {
    return await this.authService.login(message);
  }

  @MessagePattern('auth.registration.user')
  async registration(@Payload() message: CreateUserDto) {
    return await this.authService.registration(message);
  }

  @MessagePattern('auth.refresh.tokens')
  refreshTokens(@Payload() message: string) {
    return this.authService.refresh(message);
  }
}
