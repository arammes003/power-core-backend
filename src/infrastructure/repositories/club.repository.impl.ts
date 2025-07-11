import {
  ClubDatasource,
  ClubEntity,
  ClubRepository,
} from "../../domain";
import { CreateClubDto } from "../../domain/dtos/club/create-club.dto";

export class ClubRepositoyImpl implements ClubRepository {
  constructor(private readonly clubDatasource: ClubDatasource) {}

  createClub(createClubDto: CreateClubDto): Promise<ClubEntity> {
    return this.clubDatasource.createClub(createClubDto);
  }
}
