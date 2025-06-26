//Reglas de negocio de los users

import { CreateUserDto } from "../dtos/user/create-user.dto";
import { DeleteUserDto } from "../dtos/user/delete-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  // Definimos reglas
  abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;

  abstract deleteUser(deleteUserDto: DeleteUserDto): Promise<void>;
}
