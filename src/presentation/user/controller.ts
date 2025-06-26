// Fichero que contiene todas las funciones de autenticacion del usuario
import e, { Request, Response } from "express";
import {
  AuthRepository,
  CreateUser,
  CreateUserDto,
  CustomError,
  DeleteUser,
  DeleteUserDto,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserController {
  // Inyeccion de dependencias
  constructor(private readonly userRepository: UserRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError)
      return res.status(error.statusCode).json({ error: error.message });

    console.log(error);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  createUser = async (req: Request, res: Response) => {
    const [error, createUserDto] = CreateUserDto.create(req.body);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new CreateUser(this.userRepository)
      .execute(createUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  deleteuser = async (req: Request, res: Response) => {
    const [error, deleteUserDto] = DeleteUserDto.delete(req.params);
    console.log(deleteUserDto);

    if (error) {
      res.status(400).json({ error });
      return;
    }

    new DeleteUser(this.userRepository)
      .execute(deleteUserDto!)
      .then((data) =>
        res.json({ data, message: "Usuario eliminado correctamente" })
      )
      .catch((error) => this.handleError(error, res));
  };
}
