import { TCreateUser, TLoginUser, TUserRepo } from 'src/types/user.types';
import { UserRepo } from '../infra/repos/user.repo';
import { compare } from 'bcrypt';

class AuthService {
  constructor(private readonly userRepo: TUserRepo) { }

  public registerUser(data: TCreateUser) {
    return this.userRepo.create(data);
  }

  public async loginUser(data: TLoginUser) {
    const user = await this.userRepo.findByUsername(data.username);
    user.validatePassword(compare, data.password);
  }
}

const authService = new AuthService(UserRepo);
export default authService;
