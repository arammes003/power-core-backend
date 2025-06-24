// FICHERO QUE VA A PERMITIR LA INTERACCIÓN CON ARCHIVOS EN SUPABASE

// IMPORTAMOS NUESTRA CONFIGURACIÓN DE SUPABASE
import { supabase } from "./supabase-client";

// Tipos para los argumentos de la función
export interface UploadFileInput {
  originalname: string;
  buffer: Buffer | ArrayBuffer;
  mimetype: string;
}

/*
  FUNCIÓN QUE PERMITE SUBIR ARCHIVOS
  RECIBE EL FICHERO Y EL BUCKET (CONJUNTO DE DATOS) DONDE SE VAN A GUARDAR
*/
export const uploadFile = async (
  file: UploadFileInput,
  bucket: string
): Promise<string> => {
  try {
    // Creamos un nombre de fichero con la fecha y el nombre original del archivo
    const fileName = `${Date.now()}-${file.originalname}`;

    // Subimos el archivo a supabase
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file.buffer, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.mimetype,
      });

    if (error) throw new Error(`Error al subir archivo: ${error.message}`);

    // OBTENEMOS LA URL PUBLICA DEL ARCHIVO
    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    if (!publicData || !publicData.publicUrl)
      throw new Error("No se pudo obtener la URL pública del archivo");

    // MENSAJE INFORMATIVO SI OBTENEMOS CORRECTAMENTE LA URL
    console.log("URL obtenida:", publicData.publicUrl);

    // Devolvemos la URL creada de la imagen

    return publicData.publicUrl;
  } catch (error: any) {
    console.error("Error al subir archivo a Supabase:", error.message);
    throw error;
  }
};
