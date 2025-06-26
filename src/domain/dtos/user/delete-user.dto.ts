export class DeleteUserDto {
  constructor(public _id: string) {}

  // Metodo que borra un usuario
  static delete(object: { [key: string]: any }): [string?, DeleteUserDto?] {
    const { _id } = object;

    if (!_id) return ["Error al obtener el id del usuario a borrar"];

    return [undefined, new DeleteUserDto(_id)];
  }
}
