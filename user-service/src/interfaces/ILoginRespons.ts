import { User } from 'src/models/user.model';

export interface ILoginResponse {
  user: Omit<User, 'password'>;
  access: string;
  refresh: string;
}
