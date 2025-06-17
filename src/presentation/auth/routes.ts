// Fichero que contiene todas las rutas relacionadas con la autenticacion del usuario
import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const controller = new AuthController();

    // Definimos las rutas para los metodos de autenticacion
    router.post("/login", controller.loginUser);
    router.post("/register", controller.registerUser);

    return router;
  }
}
