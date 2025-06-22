// Fichero que contiene todas las rutas relacionadas con la autenticacion del usuario
import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const datasource = new AuthDatasourceImpl();
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    // Definimos las rutas para los metodos de autenticacion
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    router.get("/", AuthMiddleware.validateJwt, controller.getUsers);

    router.get(
      "/check-status",
      AuthMiddleware.validateJwt,
      controller.checkAuthStatus
    );

    return router;
  }
}
