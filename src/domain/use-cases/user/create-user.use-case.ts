// Fichero que tiene los casos de uso de registro
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";
import { UserRepository } from "../../repositories/user.repository";
import { CreateUserDto } from "../../dtos/user/create-user.dto";

interface UserNew {
  user: {
    id: string;
    name: string;
    last_name?: string;
    email: string;
    phone: string;
    birth_date: string;
    dni: string;
    gender: string;
    role: string[];
  };
}

interface CreateUserUseCase {
  execute(createUserDto: CreateUserDto): Promise<UserNew>;
}

export class CreateUser implements CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(createUserDto: CreateUserDto): Promise<UserNew> {
    // Crear el usuario
    const user = await this.userRepository.createUser(createUserDto);

    return {
      user: {
        id: user.id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        birth_date: user.birth_date,
        dni: user.dni,
        gender: user.dni,
        role: user.role,
      },
    };
  }
}
