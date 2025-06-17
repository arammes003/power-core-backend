import {
  AuthDatasource,
  CustomError,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

export class AuthDatasourceImpl implements AuthDatasource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      // 1. Verificar email
      // 2. Hash de contraseña
      // 3. Mapear la respuesta a nuestra entidad

      return new UserEntity("1", name, email, password, ["ADMIN_ROLE"]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }

      throw CustomError.internalServer();
    }
  }
}
