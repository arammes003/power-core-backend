import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import {
  CreateUserDto,
  CustomError,
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
    private readonly hashPassword: HashFunction = BcryptAdapter.hash
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const {
      email,
      birth_date,
      name,
      lastName,
      phone,
      dni,
      password,
      role,
      gender,
    } = createUserDto;

    try {
      // 1. Verificar email
      const exists = await UserModel.findOne({ email: email });
      if (exists) throw CustomError.badRequest("Correo electrónico en uso");

      const existsDni = await UserModel.findOne({ dni: dni });
      if (existsDni)
        throw CustomError.badRequest(
          "Ese DNI ya está registrado. Si no tiene acceso a su cuenta contacte con el soporte"
        );

      // 2. Creamos el usuario y hash de la contraseña
      const user = await UserModel.create({
        email: email,
        birth_date: birth_date,
        name: name,
        last_name: lastName,
        password: this.hashPassword(password),
        phone: phone,
        dni: dni,
        gender: gender,
        role: role,
        created_at: new Date(),
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
