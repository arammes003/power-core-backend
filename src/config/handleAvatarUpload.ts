import { UploadFileInput } from "../data/supabase/supabase-upload-file";
import { uploadFile } from "../data/supabase/supabase-upload-file";

/**
 * Sube un avatar al bucket 'userAvatar' y retorna la URL pública.
 * @param avatar Archivo recibido (por ejemplo, desde Multer)
 * @returns string | null URL de la imagen o null si no hay avatar
 */
export const handleAvatarUpload = async (
  avatar: UploadFileInput | undefined | null
): Promise<string | null> => {
  if (!avatar) return null;
  return await uploadFile(avatar, "avatar-users"); // uploadFile debe devolver la URL (string)
};
