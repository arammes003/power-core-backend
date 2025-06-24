// Fichero que tiene los casos de uso de registro
import { SignOptions } from "jsonwebtoken";
import { JwtAdapter } from "../../../config";
import { RegisterUserDto } from "../../dtos/auth/register-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    status: boolean;
  };
}

type SignToken = (
  payload: Object,
  duration: SignOptions["expiresIn"]
) => Promise<string | null>;

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    // Crear el usuario
    const user = await this.authRepository.register(registerUserDto);

    // Token
    const token = await this.signToken({ id: user.id }, "2h");
    if (!token) throw CustomError.internalServer("Error generating token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        status: user.status,
      },
    };
  }
}
