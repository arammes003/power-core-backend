// Fichero que tiene los casos de uso de registro

import { UserRepository } from "../../repositories/user.repository";
import { DeleteUserDto } from "../../dtos/user/delete-user.dto";

interface DeleteUserUseCase {
  execute(deleteUserDto: DeleteUserDto): Promise<void>;
}

export class DeleteUser implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(deleteUserDto: DeleteUserDto): Promise<void> {
    await this.userRepository.deleteUser(deleteUserDto);
  }
}
