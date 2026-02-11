import { JwtPayload } from "jsonwebtoken";

export interface ITokenProvider {
    sign(payload: object, secret: string, expirationTimeInSeconds: number): string;
    verify(token: string): string | JwtPayload;
}