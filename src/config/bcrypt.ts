// Fichero que encripta las contraseñas
import { compareSync, hashSync } from "bcryptjs";

export class BcryptAdapter {
  // Funcion que hashea la pass
  static hash(password: string): string {
    return hashSync(password);
  }

  // Funcion que compara la pass del form con la guardada en la bd
  static compare(password: string, hashed: string): boolean {
    return compareSync(password, hashed);
  }
}
