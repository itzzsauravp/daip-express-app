import { TCreateUser } from "src/types/user.types";
import User from "../../domain/entities/User";

export interface IUserRepository {
    findByUsername: (username: string) => Promise<User | null>;
    create(data: TCreateUser): Promise<User>;
    delete(id: string): Promise<void>;
    save(user: User): Promise<void>;
}