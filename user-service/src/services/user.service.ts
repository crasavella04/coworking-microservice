import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UserImplements } from 'src/interfaces/implements/user.implements';
import { User } from 'src/models/user.model';

@Injectable()
export class UserService implements UserImplements {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    try {
      const candidate = await this.userRepository.findOne({
        where: { email: dto.email },
      });
      if (candidate)
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      const hashPassword = await bcrypt.hash(dto.password, 7);
      const user = await this.userRepository.create({
        ...dto,
        password: hashPassword,
      });
      // const { password, ...data } = user;
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  async getUserById(id: number) {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  async getUserByEmail(email: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      // if (!user)
      //   throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return user;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
