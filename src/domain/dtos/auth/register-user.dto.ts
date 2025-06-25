// Fichero que se encarga de los objetros de transferencia en la creacion de un usuario

import { Validators } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public id: string,
    public email: string,
    public name: string,
    public last_name: string,
    public password: string,
    public phone: string,
    public dni: string,
    public birth_date: Date,
    public gender: string,
    public created_at: string,
    public is_active: boolean,
    public avatar: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const {
      id,
      email,
      name,
      lastName = "",
      password,
      phone,
      dni,
      birthDate,
      gender,
      created_at = new Date(),
      is_active = true,
      avatar = "",
    } = object;

    if (!email) return ["Introduce un correo electrónico"];
    if (!Validators.email.test(email))
      return ["El correo electrónico no es válido"];

    if (!name) return ["Introduce un nombre"];

    if (!password) return ["Introduce una contraseña"];
    if (!Validators.password.test(password))
      return [
        "La contraseña debe tener entre 6 y 15 caracteres e incluir al menos una letra mayúscula, una letra minúscula, un número y un carácter especial.",
      ];

    if (!phone) return ["Introduce un número de teléfono"];
    if (!Validators.phone.test(phone))
      return ["El número de teléfono no es válido"];

    if (!dni) return ["Introduce un Documento Nacional de Identidad"];

    if (!birthDate) return ["Introduce tu fecha de nacimiento"];
    const birthDateValue = new Date(birthDate);
    if (!Validators.birthDay(birthDateValue))
      return ["Debes ser mayor de 15 años"];

    if (!gender) return ["Introduce tu género"];

    return [
      undefined,
      new RegisterUserDto(
        id,
        email.toLowerCase(),
        name,
        lastName,
        password,
        phone,
        dni,
        birthDate,
        gender,
        created_at,
        is_active,
        avatar
      ),
    ];
  }
}
