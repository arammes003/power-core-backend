// SERVICIO QUE NOS PERMITIRÁ SUBIR IMAGENES

import multer from "multer";

export const upload = multer({
  storage: multer.memoryStorage(),
});
