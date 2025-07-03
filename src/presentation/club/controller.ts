// Fichero que contiene todas las funciones de autenticacion del usuario
import { Request, Response } from "express";
import { ClubRepository, CreateClub, CustomError } from "../../domain";
import { CreateClubDto } from "../../domain/dtos/club/create-club.dto";

export class ClubController {
  // Inyeccion de dependencias
  constructor(private readonly clubRepository: ClubRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createClub = async (req: Request, res: Response) => {
    const [error, createClubDto] = CreateClubDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new CreateClub(this.clubRepository)
      .execute(createClubDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
