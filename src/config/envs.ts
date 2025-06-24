// Exportamos nuestras variables de entorno
export const envs = {
  PORT: Number(process.env.PORT),
  MONGO_URL: process.env.MONGO_URL || "",
  MONGO_DB_NAME: process.env.MONGO_DB_NAME || "",
  JWT_SEED: process.env.JWT_SEED || "",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || "",
};
