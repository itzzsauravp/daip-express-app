import { TCreateWallet } from 'src/shared/domain/types/wallet.types';
import { Wallet } from '../entities/Wallet';

export interface IWalletRepository {
  findById(id: string): Promise<Wallet | null>;
  create(data: TCreateWallet): Promise<Wallet>;
  delete(id: string): Promise<void>;
  save(user: Wallet): Promise<void>;
}
