//Reglas de negocio de los users

import { CreateUserDto } from "../dtos/user/create-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserDatasource {
  // Definimos reglas
  abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
}
