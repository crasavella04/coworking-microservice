import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Table({
  tableName: 'user',
  createdAt: false,
  updatedAt: false,
})
export class User extends Model<User, CreateUserDto> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING(40),
    allowNull: true,
  })
  name: string;

  @Column({
    type: DataType.STRING(80),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;
}
