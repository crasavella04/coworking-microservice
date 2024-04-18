import { CreateUserDto } from 'src/dto/create-user.dto';
import { ILoginResponse } from '../ILoginRespons';
import { IRefreshResponse } from '../IRefreshResponse';

export interface AuthImplements {
  login: (dto: CreateUserDto) => Promise<ILoginResponse>;
  registration: (dto: CreateUserDto) => Promise<ILoginResponse>;
  refresh: (refresh: string) => Promise<IRefreshResponse>;
}
