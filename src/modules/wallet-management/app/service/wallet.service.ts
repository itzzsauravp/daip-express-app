import { WalletRepo } from "../../infra/repos/wallet.repo";
import { Wallet } from "../../domain/entities/Wallet";
import { NotFoundError } from "src/shared/domain/errors/errors";

export class WalletService {
  constructor(private readonly walletRepo: WalletRepo) { }

  async registerWallet(userId: string) {
    const wallet = await this.walletRepo.create({ userId });
    if (!wallet) throw new NotFoundError('Wallet not found');

    return wallet;
  }

  async getWalletInfo(id: string, includeUser: string) {
    let wallet: Wallet;
    wallet = includeUser ?
      await this.walletRepo.findByIdIncludeUser(id) :
      await this.walletRepo.findById(id);

    if (!wallet) throw new NotFoundError('Wallet not found');

    return includeUser === 'include' ? wallet.withUser() : wallet;
  }

  async loadBalance(id: string, amount: number) {
    const wallet = await this.walletRepo.findById(id);
    if (!wallet) throw new NotFoundError('Wallet not found');

    wallet.deposite(amount);
    await this.walletRepo.save(wallet);
  }

  async withdrawFunds(id: string, amount: number) {
    const wallet = await this.walletRepo.findById(id);
    if (!wallet) throw new NotFoundError('Wallet not found');

    wallet.withdraw(amount);
    await this.walletRepo.save(wallet);
  }

  async transferFunds(sendersWalletId: string, receiversWalletId: string, amount: number) {
    const { sendersWallet, transaction } = await this.walletRepo.initiateTransfer(sendersWalletId, receiversWalletId, amount);
    return { sendersWallet, transaction };
  }

}
