import { BcryptAdapter } from "../../config/bcrypt";
import { UserModel } from "../../data/mongodb";
import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

// Creacion de tipos para quitar dependencias ocultas
type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {
  // Inyeccion de dependencias
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar email
      const exists = await UserModel.findOne({ email: email });
      if (exists) throw CustomError.badRequest("User already exists");

      // 2. Creamos el usuario y hash de la contraseña
      const user = await UserModel.create({
        name: name,
        email: email,
        password: this.hashPassword(password),
      });

      // 3. Mapear la respuesta a nuestra entidad
      await user.save();

      // todo: falta mapper
      return new UserEntity(user.id, name, email, user.password, user.role);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
