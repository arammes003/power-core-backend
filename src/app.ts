import { envs } from "./config";
import { MongoDatabase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

// (() => {
//   main();
// })();

// async function main() {
//   // todo: await base de datos
//   await MongoDatabase.connect({
//     dbName: envs.MONGO_DB_NAME,
//     mongoUrl: envs.MONGO_URL,
//   });

//   // todo: inicio de nuestro server
//   new Server({
//     port: envs.PORT,
//     routes: AppRoutes.routes,
//   }).start();
// }

let serverInstance: any = null;

async function getHandler() {
  if (!serverInstance) {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
    serverInstance = new Server({
      port: envs.PORT,
      routes: AppRoutes.routes,
    });
    serverInstance.configure(); // Solo configura middlewares y rutas
  }
  return serverInstance.app;
}

// Exporta el handler para Vercel
module.exports = async (req: any, res: any) => {
  const app = await getHandler();
  return app(req, res);
};
