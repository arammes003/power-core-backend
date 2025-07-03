import { ClubModel } from "../../data/mongodb/models/club.model";
import { ClubDatasource, ClubEntity, CustomError } from "../../domain";
import { CreateClubDto } from "../../domain/dtos/club/create-club.dto";
import { ClubMapper } from "../mappers/club.mapper";

export class ClubDatasourceImpl implements ClubDatasource {
  async createClub(createClubDto: CreateClubDto): Promise<ClubEntity> {
    const {
      name,
      club_logo,
      ac_name,
      prov_name,
      city_name,
      admin,
      contact_info,
      membership_price,
    } = createClubDto;

    try {
      const clubExist = await ClubModel.findOne({ name: name });
      if (clubExist)
        throw CustomError.badRequest("Ya existe un club con ese nombre");

      const alreadyAdmin = await ClubModel.findOne({ admin: admin });
      if (alreadyAdmin)
        throw CustomError.badRequest("Ya eres administrador de un club.");

      const club = await ClubModel.create({
        name: name,
        club_logo: club_logo,
        ac_name: ac_name,
        prov_name: prov_name,
        city_name: city_name,
        contact_info: {
          email: contact_info.email,
          phone: contact_info.phone,
        },
        admin: admin,
        membership_price: membership_price,
      });

      await club.save();

      return ClubMapper.clubEntityFromObject(club);
    } catch (error) {
      if (error instanceof CustomError) throw error;

      throw CustomError.internalServer();
    }
  }
}
