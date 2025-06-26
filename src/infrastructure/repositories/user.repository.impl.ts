import {
  CreateUserDto,
  DeleteUserDto,
  UserDatasource,
  UserEntity,
  UserRepository,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDatesource: UserDatasource) {}

  createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userDatesource.createUser(createUserDto);
  }

  deleteUser(deleteUserDto: DeleteUserDto): Promise<void> {
    return this.userDatesource.deleteUser(deleteUserDto);
  }
}
