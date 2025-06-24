// Fichero que verifica y firma con jwt
import jwt, { SignOptions } from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  // Metodo que genera un token
  static async generateToken(
    payload: Object,
    duration: SignOptions["expiresIn"] = "2h"
  ): Promise<string | null> {
    console.log("[JWT] duration recibido:", duration); // <-- AÑADE ESTO
    console.trace("[JWT] Rastro de quién llamó a generateToken:");
    return new Promise((resolve) => {
      // todo: generacion de la semilla
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (error, token) => {
        if (error) return resolve(null);
        resolve(token as string);
      });
    });
  }

  // Metodo que verifica un token
  static async validateToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (error, decoded) => {
        if (error) return resolve(null);
        resolve(decoded as T);
      });
    });
  }
}
