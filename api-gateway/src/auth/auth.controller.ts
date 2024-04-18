import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { Client, ClientKafka, Transport } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'user-consumer',
      },
    },
  })
  client: ClientKafka;

  async onModuleInit() {
    this.client.subscribeToResponseOf('auth.login.user');
    this.client.subscribeToResponseOf('auth.registration.user');
    this.client.subscribeToResponseOf('auth.refresh.tokens');

    await this.client.connect();
  }

  @Post('login')
  async login(@Body() dto: any) {
    return this.client.send('auth.login.user', dto);
  }

  @Post('registration')
  async registration(@Body() dto: any) {
    return this.client.send('auth.registration.user', dto);
  }

  @Get('refresh')
  async refresh(@Headers('Authorization') token: string) {
    console.log(token);

    return this.client.send('auth.refresh.tokens', token);
  }
}
