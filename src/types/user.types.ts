export type TCreateUser = {
  username: string;
  password: string;
};

export type TLoginUser = {
  username: string;
  password: string;
}

export type TUpdateUser = { id: string } & Partial<TCreateUser>;
