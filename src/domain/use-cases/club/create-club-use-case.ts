// Fichero que tiene los casos de uso de registro

import { Types } from "mongoose";
import { CreateClubDto } from "../../dtos/club/create-club.dto";
import { CreateUserDto } from "../../dtos/user/create-user.dto";
import { ClubRepository } from "../../repositories/club.repository";

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

interface ClubNew {
  club: {
    id: string;
    name: string;
    club_logo: string;
    ac_name: string;
    prov_name: string;
    city_name: string;
    contact_info: ContactInfo;
    admin: Types.ObjectId | string;
    membership_price: number;
    coaches?: (Types.ObjectId | string)[];
    athletes?: (Types.ObjectId | string)[];
    description?: string;
  };
}

interface CreateClubUseCase {
  execute(createClubDto: CreateClubDto): Promise<ClubNew>;
}

export class CreateClub implements CreateClubUseCase {
  constructor(private readonly clubRepository: ClubRepository) {}

  async execute(createClubDto: CreateClubDto): Promise<ClubNew> {
    // Crear el club
    const club = await this.clubRepository.createClub(createClubDto);

    return {
      club: {
        id: club.id,
        name: club.name,
        club_logo: club.club_logo,
        ac_name: club.ac_name,
        prov_name: club.prov_name,
        city_name: club.city_name,
        contact_info: club.contact_info,
        admin: club.admin,
        membership_price: club.membership_price,
        coaches: club.coaches,
        athletes: club.athletes,
        description: club.description,
      },
    };
  }
}
