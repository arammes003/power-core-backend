// Fichero que se encarga de lso objetos de transferencia en el login de un usuario

import { Validators } from "../../../config";

export class LoginUserDto {
  constructor(public email: string, public password: string) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (!password) return ["Missing password"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!Validators.password.test(password))
      return [
        "Password must be 6–15 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      ];

    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
