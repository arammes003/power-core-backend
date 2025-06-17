// Fichero que contiene todas las rutas relacionadas con la autenticacion del usuario
import { Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    // Definimos las rutas para los metodos de autenticacion
    router.post("/login", (req, res) => {
      res.json("LOGIN");
    });
    router.post("/register", (req, res) => {
      res.json("REGISTER");
    });

    return router;
  }
}
