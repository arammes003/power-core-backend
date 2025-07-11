// Fichero que contiene todas las funciones de autenticacion del usuario
import e, { Request, Response } from "express";
import {
  AuthRepository,
  CustomError,
  LoginUser,
  LoginUserDto,
  RegisterUser,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { UserModel } from "../../data/mongodb";
import { CheckAuthStatus } from "../../domain/use-cases/auth/check-auth-status";
import { uploadFile } from "../../data/supabase/supabase-upload-file";
import { handleAvatarUpload } from "../../config/handleAvatarUpload";
import sharp from "sharp";
import { convertToAvif } from "../../config/converter-avif";

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

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;
    const avatar = files && files["avatar"] ? files["avatar"][0] : undefined;

    if (error) {
      res.status(400).json({ error });
      return;
    }

    if (avatar) {
      const avifAvatar = await convertToAvif(avatar);

      const avatarUrl = await handleAvatarUpload(avifAvatar);
      if (avatarUrl) registerUserDto!.avatar = avatarUrl;
    }

    new RegisterUser(this.authRepository)
      .execute(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  loginUser = async (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.login(req.body);
    if (error) {
      res.status(400).json({ error });
      return;
    }

    new LoginUser(this.authRepository)
      .execute(loginUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };

  getUsers = (req: Request, res: Response) => {
    UserModel.find()
      .then((users) =>
        res.json({
          users,
        })
      )
      .catch(() => res.status(500).json({ error: "Internal Server Error" }));
  };

  // Metodo encargado de comprobar el estado del token del usuario
  checkAuthStatus = async (req: Request, res: Response) => {
    // const user = req.body.user;
    const user = res.locals.user;

    new CheckAuthStatus(this.authRepository)
      .execute(user!)
      .then((data) => res.json(data))
      .catch((error) => this.handleError(error, res));
  };
}
