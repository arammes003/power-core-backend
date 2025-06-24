import { SignOptions } from "jsonwebtoken";
import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { JwtPaylaod } from "../../domain/entities/jwt-payload.interface";
import { UserMapper } from "../mappers/user.mapper";

// Creacion de tipos para quitar dependencias ocultas
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

type SignToken = (
  payload: Object,
  duration: SignOptions["expiresIn"]
) => Promise<string | null>;

export class AuthDatasourceImpl implements AuthDatasource {
  // Inyeccion de dependencias
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
    private readonly signToken: SignToken = JwtAdapter.generateToken,
    private remember: boolean | undefined = false
  ) {}

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password, rememberMe } = loginUserDto;
    this.remember = rememberMe;

    try {
      const user = await UserModel.findOne({ email: email });
      if (!user) throw CustomError.badRequest("Credenciales incorrectas");

      const isMatching = this.comparePassword(password, user.password);
      if (!isMatching) throw CustomError.badRequest("Credenciales incorrectas");

      if (!user.isActive)
        throw CustomError.badRequest(
          "Cuenta inactiva. Contacta con el soporte"
        );

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, lastName, email, password, avatar } = registerUserDto;

    try {
      // 1. Verificar email
      const exists = await UserModel.findOne({ email: email });
      if (exists) throw CustomError.badRequest("Correo electrónico en uso");

      // 2. Creamos el usuario y hash de la contraseña
      const user = await UserModel.create({
        name: name,
        lastName: lastName,
        email: email,
        password: this.hashPassword(password),
        createdAt: new Date(),
        avatar: avatar,
      });

      // 3. Mapear la respuesta a nuestra entidad
      await user.save();

      // todo: falta mapper
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }

  async checkAuthStatus(
    user: UserEntity
  ): Promise<{ user: UserEntity; token: string }> {
    const token = await this.getJwtToken({ id: user.id }, this.remember);
    return {
      user: user,
      token,
    };
  }

  private async getJwtToken(
    payload: JwtPaylaod,
    rememberMe: boolean | undefined
  ): Promise<string> {
    const expiresIn = rememberMe ? "30d" : "2h";
    const token = await JwtAdapter.generateToken(payload, expiresIn);
    return token ?? ""; // o lanza error si token es null
  }
}
