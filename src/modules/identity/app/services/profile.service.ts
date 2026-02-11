import { UserRepo } from '../../infra/repos/user.repo';

export class ProfileService {
  constructor(private readonly userRepo: UserRepo) { }
}