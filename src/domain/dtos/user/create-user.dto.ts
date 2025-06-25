import { Validators } from "../../../config";

export class CreateUserDto {
  constructor(
    public name: string,
    public lastName: string,
    public email: string,
    public password: string,
    public role: string[]
  ) {}

  // Metodo que crea un usuario
  static create(object: { [key: string]: any }): [string?, CreateUserDto?] {
    const { name, lastName = "", email, password = "Hola12@", role } = object;

    if (!name) return ["Introduce el nombre del usuario"];
    if (!email) return ["Introduce un correo electrónico"];
    if (!Validators.email.test(email))
      return ["El correo electrónico no es válido"];

    if (role.length === 0) {
      return ["Selecciona al menos un rol para el usuario"];
    }

    return [
      undefined,
      new CreateUserDto(name, lastName, email.toLowerCase(), password, role),
    ];
  }
}
