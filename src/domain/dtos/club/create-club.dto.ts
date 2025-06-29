// DTO Para crear un club

import { Types } from "mongoose";
import { Validators } from "../../../config";

export class CreateClubDto {
  constructor(
    public name: string,
    public club_logo: string,
    public ac_name: string,
    public prov_name: string,
    public city_name: string,
    public contact_info: {
      phone: string;
      email: string;
    },
    public membership_price: number
  ) {}

  // Método que crea el objeto DTO
  static create(object: { [key: string]: any }): [string?, CreateClubDto?] {
    const {
      name,
      club_logo,
      ac_name,
      prov_name,
      city_name,
      phone,
      email,
      membership_price,
    } = object;

    if (!name) return ["Introduce el nombre del club"];
    if (!club_logo) return ["Introduce el logo del club"];
    if (!ac_name) return ["Introduce la comunidad autónoma del club"];
    if (!prov_name) return ["Introduce la provincia del club"];
    if (!city_name) return ["Introduce la ciudad del club"];
    if (!phone) return ["Introduce el teléfono de contacto del club"];
    if (!email) return ["Introduce el correo electrónico de contacto del club"];
    if (!membership_price) return ["Introduce el precio de la inscripción"];

    if (!Validators.phone.test(phone))
      return ["Introduce un número de teléfono válido"];
    if (!Validators.email.test(email))
      return ["Introduce un correo electrónico válido"];

    const contact_info = {
      phone,
      email,
    };

    return [
      undefined,
      new CreateClubDto(
        name,
        club_logo,
        ac_name,
        prov_name,
        city_name,
        contact_info,
        membership_price
      ),
    ];
  }
}
