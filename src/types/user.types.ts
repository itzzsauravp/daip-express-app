import { UserRepo } from 'src/modules/identity/infra/repos/user.repo';

export type TCreateUser = {
  username: string;
  password: string;
};

export type TLoginUser = {
  username: string;
  password: string;
}

export type TUpdateUser = { id: string } & Partial<TCreateUser>;

export type TUserRepo = typeof UserRepo;
