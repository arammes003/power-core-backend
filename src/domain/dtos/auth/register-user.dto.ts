// Fichero que se encarga de los objetros de transferencia en la creacion de un usuario

import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public avatar?: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password, avatar } = object;

    if (!name) return ["Missing name"];
    if (!email) return ["Missing email"];
    if (!Validators.email.test(email)) return ["Email is not valid"];
    if (!password) return ["Missing password"];
    if (!Validators.password.test(password))
      return [
        "Password must be 6–15 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      ];

    return [
      undefined,
      new RegisterUserDto(name, email.toLowerCase(), password, avatar),
    ];
  }
}
