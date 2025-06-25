// Fichero que transforma los datos a nuestra entidad
import { CustomError, UserEntity } from "../../domain";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    // Desestructuramos el objeto
    const {
      id,
      _id,
      name,
      last_name,
      email,
      password,
      phone,
      birth_date,
      gender,
      role,
      created_at,
      is_active,
      avatar,
    } = object;

    if (!_id || !id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!email) throw CustomError.badRequest("Missing email");

    if (!password) throw CustomError.badRequest("Missing password");

    if (!phone) throw CustomError.badRequest("Missing phone");

    if (!birth_date) throw CustomError.badRequest("Missing birth date");

    if (!gender) throw CustomError.badRequest("Missing gender");

    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(
      _id || id,
      email,
      name,
      last_name,
      password,
      phone,
      gender,
      birth_date,
      role,
      created_at,
      is_active,
      avatar
    );
  }
}
