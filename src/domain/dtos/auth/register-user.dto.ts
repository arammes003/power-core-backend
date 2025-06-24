// Fichero que se encarga de los objetros de transferencia en la creacion de un usuario

import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public id: string,
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public isActive: boolean,
    public avatar: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      id,
      name,
      lastName = "",
      email,
      password,
      isActive = true,
      avatar = "",
    } = object;

    if (!name) return ["Introduce un nombre"];
    if (!email) return ["Introduce un correo electrónico"];
    if (!Validators.email.test(email))
      return ["El correo electrónico no es válido"];
    if (!password) return ["Introduce una contraseña"];
    if (!Validators.password.test(password))
      return [
        "La contraseña debe tener entre 6 y 15 caracteres e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      ];

    return [
      undefined,
      new RegisterUserDto(
        id,
        name,
        lastName,
        email.toLowerCase(),
        password,
        isActive,
        avatar
      ),
    ];
  }
}
