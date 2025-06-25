import { Validators } from "../../../config";

export class CreateUserDto {
  constructor(
    public email: string,
    public birth_date: Date,
    public name: string,
    public lastName: string,
    public phone: string,
    public dni: string,
    public password: string,
    public role: string[],
    public gender: string
  ) {}

  // Metodo que crea un usuario
  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const {
      email,
      birth_date,
      name,
      lastName = "",
      phone,
      dni,
      password = "Hola12@",
      role,
      gender,
    } = object;

    if (!email) return ["Introduce un correo electrónico"];
    if (!Validators.email.test(email))
      return ["El correo electrónico no es válido"];

    if (!birth_date) return ["Introduce tu fecha de nacimiento"];
    const birthDateValue = new Date(birth_date);
    if (!Validators.birthDay(birthDateValue))
      return ["Debes ser mayor de 15 años"];

    if (!phone) return ["Introduce un número de teléfono"];
    if (!Validators.phone.test(phone))
      return ["El número de teléfono no es válido"];

    if (!dni) return ["Introduce un Documento Nacional de Identidad"];

    if (!name) return ["Introduce el nombre del usuario"];

    if (role.length === 0) {
      return ["Selecciona al menos un rol para el usuario"];
    }

    if (!gender) return ["Selecciona el género del usuario"];

    return [
      undefined,
      new CreateUserDto(
        email.toLowerCase(),
        birth_date,
        name,
        lastName,
        phone,
        dni,
        password,
        role,
        gender
      ),
    ];
  }
}
