// Fichero que tiene la entidad del club

import { Types } from "mongoose";

interface SocialMedia {
  instagram?: string;
  facebook?: string;
  youtube?: string;
}

interface ContactInfo {
  phone: string;
  email: string;
  website?: string;
  social_media?: SocialMedia;
}

export class ClubEntity {
  constructor(
    public id: string,
    public name: string,
    public club_logo: string,
    public ac_name: string,
    public prov_name: string,
    public city_name: string,
    public contact_info: ContactInfo,
    public admin: Types.ObjectId | string,
    public membership_price: number,
    public coaches?: (Types.ObjectId | string)[],
    public athletes?: (Types.ObjectId | string)[],
    public description?: string
  ) {}
}
