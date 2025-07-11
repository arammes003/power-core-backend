import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  // Definimos reglas
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;

  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;

  abstract checkAuthStatus(
    user: UserEntity
  ): Promise<{ user: UserEntity; token: string }>;
}
