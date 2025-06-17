// Fichero que contiene todas las rutas de la aplicacion

// Import Express
import { Router } from "express";

// Import rutas
import { AuthRoutes } from "./auth/routes";

// Exportamos las rutas de la aplicacion
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definimos las rutas principales
    router.use("/api/auth", AuthRoutes.routes);

    return router;
  }
}
