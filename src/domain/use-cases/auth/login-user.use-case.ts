// Fichero que contiene los casos de uso para el login

import { SignOptions } from "jsonwebtoken";
import { LoginUserDto } from "../../dtos/auth/login-user.dto";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtAdapter } from "../../../config";
import { CustomError } from "../../errors/custom.error";

interface UserToken {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string[];
  };
}

type SignToken = (
  payload: Object,
  duration: SignOptions["expiresIn"]
) => Promise<string | null>;

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

export class LoginUser implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = (payload, duration) =>
      JwtAdapter.generateToken(payload, duration)
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);

    const expiresIn = loginUserDto.rememberMe ? "30d" : "2h";
    const token = await this.signToken({ id: user.id }, expiresIn);
    if (!token) throw CustomError.internalServer("Error generando token");

    console.log(loginUserDto.rememberMe);
    console.log(expiresIn);

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
