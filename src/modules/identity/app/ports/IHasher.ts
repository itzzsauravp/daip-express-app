export interface IHasher {
    hash(plain: string, salt: number): Promise<string>;
    compare(plain: string, hashed: string): Promise<boolean>;
}