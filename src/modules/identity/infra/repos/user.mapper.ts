import { User as TPrismaUser } from 'src/generated/prisma/client';
import User from "../../domain/entities/User";

export class UserMapper {
    public static toDomain(raw: TPrismaUser): User {
        return new User({
            id: raw.id,
            username: raw.username,
            password: raw.password,
            isDeleted: raw.isDeleted,
            createdAt: raw.createdAt,
        })
    }

    public static toPersistence(entity: User): TPrismaUser {
        return {
            id: entity.id,
            username: entity.username,
            password: entity.password,
            isDeleted: entity.isDeleted,
            createdAt: entity.createdAt,
        }
    }
}
