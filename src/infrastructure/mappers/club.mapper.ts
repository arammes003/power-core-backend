// Fichero que transforma los datos a nuestra entidad
import { ClubEntity, CustomError, UserEntity } from "../../domain";

export class ClubMapper {
  static clubEntityFromObject(object: { [key: string]: any }) {
    // Desestructuramos el objeto
    const {
      id,
      _id,
      name,
      club_logo,
      ac_name,
      prov_name,
      city_name,
      contact_info,
      admin,
      membership_price,
      created_at,
    } = object;

    if (!_id || !id) throw CustomError.badRequest("Missing id");

    if (!name) throw CustomError.badRequest("Missing name");

    if (!club_logo) throw CustomError.badRequest("Missing club logo");

    if (!ac_name) throw CustomError.badRequest("Missing ac");

    if (!prov_name) throw CustomError.badRequest("Missing province");

    if (!city_name) throw CustomError.badRequest("Missing city");

    if (!contact_info) throw CustomError.badRequest("Missing contact info");

    if (!admin) throw CustomError.badRequest("Missing admin");

    return new ClubEntity(
      _id || id,
      name,
      club_logo,
      ac_name,
      prov_name,
      city_name,
      contact_info,
      admin,
      membership_price,
      created_at
    );
  }
}
