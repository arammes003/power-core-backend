import sharp from "sharp";

export async function convertToAvif(
  file: Express.Multer.File,
  options?: {
    width?: number;
    height?: number;
    quality?: number;
    fit?: keyof sharp.FitEnum;
  }
): Promise<Express.Multer.File> {
  const {
    width = 256,
    height = 256,
    quality = 50,
    fit = "cover",
  } = options || {};

  const avifBuffer = await sharp(file.buffer)
    .resize(width, height, { fit })
    .avif({ quality })
    .toBuffer();

  return {
    ...file,
    buffer: avifBuffer,
    mimetype: "image/avif",
    originalname: file.originalname.replace(/\.[^/.]+$/, "") + ".avif",
  };
}
