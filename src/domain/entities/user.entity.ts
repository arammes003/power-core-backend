// Fichero que tiene la entidad del usuario

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public name: string,
    public password: string,
    public phone: string,
    public birth_date: string,
    public gender: string,
    public role: string[],
    public created_at: Date,
    public is_active: boolean,
    public last_name?: string,
    public avatar?: string
  ) {}
}
