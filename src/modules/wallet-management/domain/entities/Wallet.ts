import { BadRequestError, NotFoundError } from "src/errors/errors";

export interface WalletProps {
  id: string;
  userId: string;
  balance: number;
  isActive: boolean;
  createdAt: Date;
  user?: {
    id: string;
    username: string;
    password: string;
    isDeleted: boolean;
    createdAt: Date;
  }
}

export class Wallet {
  constructor(private readonly data: WalletProps) { }

  get id() {
    return this.data.id;
  }

  get user() {
    return this.data.user;
  }

  get userId() {
    return this.data.userId;
  }

  get balance() {
    return this.data.balance;
  }

  get isActive() {
    return this.data.isActive;
  }

  get createdAt() {
    return this.data.createdAt;
  }

  deposite(amount: number) {
    if (amount <= 0) throw new BadRequestError('amount cannot be negative')
    this.data.balance = this.data.balance + amount;
  }

  withdraw(amount: number) {
    if (amount <= 0) throw new BadRequestError('amount cannot be negative')
    if (this.data.balance < 0 || this.data.balance < amount) throw new BadRequestError('insufficient balance');
    this.data.balance = this.data.balance - amount;
  }

  hasLoadedUser() {
    return !!this.data.user;
  }

  withUser() {
    if (!this.hasLoadedUser()) return this.toJSON();
    const { password, isDeleted, username, ...rest } = this.data.user;
    return { ...this.data, ...rest };
  }

  toJSON() {
    return { ...this.data };
  }
}
