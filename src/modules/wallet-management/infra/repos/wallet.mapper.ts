import { Prisma, Wallet as PrismaWallet } from "src/generated/prisma/client";
import { Wallet } from "../../domain/entities/Wallet";
import { Balance } from "../../domain/value-objects/Balance";

export class WalletMapper {
    public static toDomain(raw: PrismaWallet): Wallet {
        return new Wallet({
            id: raw.id,
            balance: Balance.fromDecimal(raw.balance).getValue(),
            createdAt: raw.createdAt,
            isActive: raw.isActive,
            userId: raw.userId,
        })
    }

    public static toDomainWithUser(raw: PrismaWallet) {
        return new Wallet({
            id: raw.id,
            balance: Balance.fromDecimal(raw.balance).getValue(),
            createdAt: raw.createdAt,
            isActive: raw.isActive,
            userId: raw.userId,
            user: (raw as any).user, // how to fix this ?
        })
    }

    public static toPersistence(entity: Wallet): PrismaWallet {
        return {
            id: entity.id,
            balance: new Prisma.Decimal(entity.balance.toString()),
            createdAt: entity.createdAt,
            isActive: entity.isActive,
            userId: entity.userId
        }
    }
}