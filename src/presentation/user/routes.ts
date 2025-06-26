// Fichero que contiene todas las rutas relacionadas con la autenticacion del usuario
import { Router } from "express";
import { UserController } from "./controller";
import { UserDatasourceImpl, UserRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new UserDatasourceImpl();
    const userRepository = new UserRepositoryImpl(datasource);
    const controller = new UserController(userRepository);

    // Definimos las rutas para los metodos de autenticacion
    router.post(
      "/create-user",
      AuthMiddleware.validateJwt,
      controller.createUser
    );

    router.delete(
      "/delete-user/:_id",
      AuthMiddleware.validateJwt,
      controller.deleteuser
    );

    return router;
  }
}
