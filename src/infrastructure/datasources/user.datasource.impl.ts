import { SignOptions } from "jsonwebtoken";
import { BcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CreateUserDto,
  CustomError,
  LoginUserDto,
  RegisterUserDto,
  UserDatasource,
  UserEntity,
} from "../../domain";
import { JwtPaylaod } from "../../domain/entities/jwt-payload.interface";
import { UserMapper } from "../mappers/user.mapper";

// Creacion de tipos para quitar dependencias ocultas
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class UserDatasourceImpl implements UserDatasource {
  // Inyeccion de dependencias
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { name, lastName, email, password, role } = createUserDto;

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
        role: role,
        createdAt: new Date(),
      });

      // 3. Mapear la respuesta a nuestra entidad
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
