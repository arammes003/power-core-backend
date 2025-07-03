//Reglas de negocio de los clubes

import { CreateClubDto } from "../dtos/club/create-club.dto";
import { ClubEntity } from "../entities/club.entity";

export abstract class ClubRepository {
  // Definimos reglas
  abstract createClub(createClub: CreateClubDto): Promise<ClubEntity>;
}
