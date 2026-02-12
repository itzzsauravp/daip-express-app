import { WalletService } from "./app/service/wallet.service";
import { WalletRepo } from "./infra/repos/wallet.repo";

const walletRepo = new WalletRepo();
const walletService = new WalletService(walletRepo);

export { walletService }