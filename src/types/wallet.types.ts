export type TCreateWallet = {
  userId: string;
};

export type TUpdateWallet = {
  isActive?: boolean;
  balance?: number;
};
