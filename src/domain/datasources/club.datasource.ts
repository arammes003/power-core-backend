//Reglas de negocio del club

import { CreateClubDto } from "../dtos/club/create-club.dto";
import { ClubEntity } from "../entities/club.entity";

export abstract class ClubDatasource {
  // Definimos reglas
  abstract createClub(createClubDto: CreateClubDto): Promise<ClubEntity>;
}
