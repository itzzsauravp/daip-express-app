import { TCreateWallet } from "src/types/wallet.types";
import { Wallet } from "../../domain/entities/Wallet";
import { IWalletRepository } from "../../domain/ports/IWalletRepository";
import prisma from "src/lib/prisma.lib";
import { WalletMapper } from "./wallet.mapper";

export class WalletRepo implements IWalletRepository {

    async findByIdIncludeUser(id: string): Promise<Wallet | null> {
        const wallet = await prisma.wallet.findUnique({
            where: {
                id
            },
            include: { user: true }
        })

        if (!wallet) return null;

        return WalletMapper.toDomainWithUser(wallet);
    }

    async findById(id: string): Promise<Wallet | null> {
        const wallet = await prisma.wallet.findUnique({
            where: {
                id
            }
        })

        if (!wallet) return null;

        return WalletMapper.toDomain(wallet);
    }

    async findByUserId(id: string): Promise<Wallet | null> {
        const wallet = await prisma.wallet.findUnique({
            where: {
                userId: id
            }
        })

        if (!wallet) return null;

        return WalletMapper.toDomain(wallet);
    }

    async create(data: TCreateWallet): Promise<Wallet> {
        const wallet = await prisma.wallet.create({
            data: {
                userId: data.userId
            }
        })

        return WalletMapper.toDomain(wallet);
    }

    async delete(id: string): Promise<void> {
        await prisma.wallet.delete({
            where: {
                id
            }
        })
    }

    async save(wallet: Wallet): Promise<void> {
        await prisma.wallet.update({
            where: {
                id: wallet.id
            }, data: WalletMapper.toPersistence(wallet),
        })
    }

    async initiateTransfer(sendersWalletId: string, receiversWalletId: string, amount: number) {
        return await prisma.$transaction(async (tx) => {
            const sendersWallet = await tx.wallet.update({
                where: {
                    id: sendersWalletId
                }, data: {
                    balance: {
                        decrement: amount
                    }
                }
            })
            const receiversWallet = await tx.wallet.update({
                where: {
                    id: receiversWalletId,
                }, data: {
                    balance: {
                        increment: amount
                    }
                }
            })
            const transaction = await tx.transaction.create({
                data: {
                    amount,
                    sender: { connect: { id: sendersWallet.userId } },
                    receiver: { connect: { id: receiversWallet.userId } }
                }
            })
            return { sendersWallet, receiversWallet, transaction }
        })
    }
}
