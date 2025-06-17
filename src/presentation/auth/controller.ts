// Fichero que contiene todas las funciones de autenticacion del usuario
import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";
import { log } from "node:console";

export class AuthController {
  // Inyeccion de dependencias
  constructor(private readonly authRepository: AuthRepository) {}

  registerUser = async (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) res.status(400).json({ error });
    else
      this.authRepository
        .register(registerUserDto!)
        .then((user) => res.json(user))
        .catch((error) => res.status(500).json(error));
  };

  loginUser = (req: Request, res: Response) => {
    res.json("loginUser");
  };
}
