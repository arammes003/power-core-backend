// Fichero que verifica y firma con jwt
import jwt, { SignOptions } from "jsonwebtoken";

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: SignOptions["expiresIn"] = "2h"
  ): Promise<string | null> {
    return new Promise((resolve) => {
      // todo: generacion de la semilla
      jwt.sign(payload, "SEED", { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);
        resolve(token as string);
      });
    });
  }
}
