import { User as TPrismaUser } from 'src/generated/prisma/client';
import bcrypt from 'bcrypt';

export default class User {
  constructor(private readonly data: TPrismaUser) { }

  get id() {
    return this.data.id;
  }
  get username() {
    return this.data.username;
  }
  get isDeleted() {
    return this.data.isDeleted;
  }

  public delete() {
    if (this.data.isDeleted) {
      throw new Error('User is already deleted.');
    }
    this.data.isDeleted = true;
  }

  public async validatePassword(hasher: any, password: string) {
    const val = hasher(password, this.data.password);
    if (!val) throw new Error('invalid password');
  }

  public async updatePassword(newPassword: string) {
    if (newPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }
    this.data.password = await bcrypt.hash(newPassword, 10);
  }

  public canPerformTransaction(): boolean {
    return !this.data.isDeleted;
  }

  public toPersistence() {
    return { ...this.data };
  }

  public toResponseFormat() {
    const { password: _, ...rest } = this.data;
    return rest;
  }
}
