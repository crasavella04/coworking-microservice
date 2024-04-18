import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/models/user.model';

type UserData = Omit<User, 'password'>;

export interface UserImplements {
  createUser: (dto: CreateUserDto) => Promise<UserData>;
  getUserById: (id: number) => Promise<UserData>;
  getUserByEmail: (email: string) => Promise<UserData>;
}
