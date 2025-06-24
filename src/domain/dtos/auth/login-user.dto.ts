// Fichero que se encarga de lso objetos de transferencia en el login de un usuario

import { Validators } from "../../../config";

export class LoginUserDto {
  constructor(
    public email: string,
    public password: string,
    public rememberMe?: boolean
  ) {}

  static login(object: { [key: string]: any }): [string?, LoginUserDto?] {
    const { email, password, rememberMe } = object;

    if (!email) return ["Introduce un correo electrónico"];
    if (!password) return ["Introduce una contraseña"];
    if (!Validators.email.test(email))
      return ["El correo electrónico no es válido"];
    if (!Validators.password.test(password))
      return [
        "La contraseña debe tener entre 6 y 15 caracteres e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      ];

    // Validar rememberMe como booleano si viene presente
    if (rememberMe !== undefined && typeof rememberMe !== "boolean")
      return ["El campo 'recordarme' debe ser booleano"];

    return [
      undefined,
      new LoginUserDto(email.toLowerCase(), password, rememberMe),
    ];
  }
}
