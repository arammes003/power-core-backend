import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { envs } from "../../config";

const SUPABASE_URL = envs.SUPABASE_URL;
const SUPABASE_ANON_KEY = envs.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    "Faltan las variables de entorno SUPABASE_URL o SUPABASE_ANON_KEY"
  );
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
