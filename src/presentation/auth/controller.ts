// Fichero que contiene todas las funciones de autenticacion del usuario
import e, { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  RegisterUser,
  RegisterUserDto,
} from "../../domain";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";

export class AuthController {
  // Inyeccion de dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser");
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.json({
          users,
          user: req.body.user,
        })
      )
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };
}
