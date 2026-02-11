import { BadRequestError, UnauthorizedError } from 'src/errors/errors';

interface UserProps {
  id: string;
  username: string;
  password: string;
  isDeleted: boolean;
  createdAt: Date;
}

export default class User {
  constructor(private readonly data: UserProps) { }

  get id() {
    return this.data.id;
  }

  get password() {
    return this.data.password;
  }

  get username() {
    return this.data.username;
  }

  get isDeleted() {
    return this.data.isDeleted;
  }

  get createdAt() {
    return this.data.createdAt;
  }

  public delete() {
    if (this.data.isDeleted) {
      throw new Error('User is already deleted.');
    }
    this.data.isDeleted = true;
  }

  public async validatePassword(compareFn: (plainString: string, hashVal: string) => Promise<boolean>, password: string) {
    if (this.data.isDeleted) throw new UnauthorizedError('ACCOUNT_TERMINATED: this account has been terminated')
    const val = compareFn(password, this.data.password);
    if (!val) throw new UnauthorizedError('UNAUTHORIZED: invalid credential');
  }

  public async updatePassword(newPassword: string, hashFn: (plain: string, salt: number) => Promise<string>) {
    if (this.data.isDeleted) throw new UnauthorizedError('ACCOUNT_TERMINATED: this account has been terminated')
    if (newPassword.length < 8) {
      throw new BadRequestError('Password must be at least 8 characters long.');
    }
    this.data.password = await hashFn(newPassword, 10);
  }

  public canPerformActions(): boolean {
    return !this.data.isDeleted;
  }

  public toJSON() {
    const { password, isDeleted, ...rest } = this.data;
    return rest;
  }
}
