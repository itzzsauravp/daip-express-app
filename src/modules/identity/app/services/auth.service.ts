import { TCreateUser, TLoginUser } from 'src/types/user.types';
import { IHasher } from '../ports/IHasher';
import { ITokenProvider } from '../ports/ITokenProvider';
import { UserRepo } from '../../infra/repos/user.repo';
import { BadRequestError, UnauthorizedError } from 'src/errors/errors';

export class AuthService {
  constructor
    (
      private readonly userRepo: UserRepo,
      private readonly hasher: IHasher,
      private readonly tokenProvider: ITokenProvider
    ) { }

  public registerUser(data: TCreateUser) {
    return this.userRepo.create(data);
  }

  public async loginUser(data: TLoginUser) {
    const user = await this.userRepo.findByUsername(data.username);

    user.validatePassword(this.hasher.compare, data.password);

    const token = this.tokenProvider.sign({ sub: user.id }, 'access-token-secret', 15 * 60);
    const refreshToken = this.tokenProvider.sign({ sub: user.id }, 'refresh-token-secret', 7 * 24 * 60 * 60);

    return { user, token, refreshToken };
  }

  public async tokenRefresh(refreshToken: string) {
    if (!refreshToken) throw new BadRequestError('token not available');

    const { sub } = this.tokenProvider.verify(refreshToken);
    const user = await this.userRepo.findById(sub as string);
    if (!user.canPerformActions()) throw new UnauthorizedError('UNAUTHORIZED: you are not authorized to access this route');

    const token = this.tokenProvider.sign({ sub: user.id }, 'access-token-secret', 15 * 60);
    const newRefreshToken = this.tokenProvider.sign({ sub: user.id }, 'refresh-token-secret', 7 * 24 * 60 * 60);

    return { token, newRefreshToken }
  }

}

