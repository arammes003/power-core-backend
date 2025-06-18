// Exportamos nuestras variables de entorno
export const envs = {
  PORT: Number(process.env.PORT),
  MONGO_URL: process.env.MONGO_URL || "",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
  JWT_SEED: process.env.JWT_SEED || "",
};
