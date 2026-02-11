import bcrypt from 'bcrypt';
import { IHasher } from '../../app/ports/IHasher';

export class BcryptHasher implements IHasher {
    private readonly salt = 10;
    async hash(plain: string) { return bcrypt.hash(plain, this.salt); }
    async compare(plain: string, hashed: string) { return bcrypt.compare(plain, hashed); }
}