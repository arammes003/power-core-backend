// Fichero que contiene todas las rutas relacionadas con la autenticacion del usuario
import { Router } from "express";
import { ClubDatasourceImpl, ClubRepositoyImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ClubController } from "./controller";
import { upload } from "../../data/multer/upload-file";

export class ClubRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new ClubDatasourceImpl();
    const clubRepository = new ClubRepositoyImpl(datasource);
    const controller = new ClubController(clubRepository);

    // Definimos las rutas para los metodos de autenticacion
    router.post(
      "/create-club",
      AuthMiddleware.validateJwt,
      upload.fields([{ name: "club_logo", maxCount: 1 }]),
      controller.createClub
    );

    return router;
  }
}
