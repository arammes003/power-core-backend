// Fichero que contiene todas las rutas de la aplicacion

// Import Express
import { Router } from "express";

// Import rutas
import { AuthRoutes } from "./auth/routes";
import { UserRoutes } from "./user/routes";
import { ClubRoutes } from "./club/routes";

// Exportamos las rutas de la aplicacion
export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    // Definimos las rutas principales
    router.use("/api/auth", AuthRoutes.routes);

    // Rutas usuarios
    router.use("/api/users", UserRoutes.routes);

    // Rutas clubes
    router.use("/api/clubs", ClubRoutes.routes);

    return router;
  }
}
