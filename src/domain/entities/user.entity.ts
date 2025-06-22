// Fichero que tiene la entidad del usuario

export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public createdAt: Date,
    public status: boolean,
    public avatar?: string
  ) {}
}
