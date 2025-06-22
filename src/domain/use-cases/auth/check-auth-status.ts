import { UserEntity } from "../../entities/user.entity";
import { AuthRepository } from "../../repositories/auth.repository";

export class CheckAuthStatus {
  constructor(private readonly authRepository: AuthRepository) {}

  execute(user: UserEntity) {
    return this.authRepository.checkAuthStatus(user);
  }
}
