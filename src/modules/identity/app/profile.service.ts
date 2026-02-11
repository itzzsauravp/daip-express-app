import { TUpdateUser, TUserRepo } from 'src/types/user.types';
import { UserRepo } from '../infra/repos/user.repo';

class ProfileService {
  constructor(private readonly userRepo: TUserRepo) {}
  public save(data: TUpdateUser) {
    this.userRepo.update(data);
  }
}

const profileService = new ProfileService(UserRepo);
export default profileService;
