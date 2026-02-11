import jwt, { JwtPayload } from 'jsonwebtoken';
import { ITokenProvider } from '../../app/ports/ITokenProvider';

export class JwtProvider implements ITokenProvider {
    private readonly secret = process.env.JWT_SECRET || 'dev_secret';
    sign(payload: object): string {
        return jwt.sign(payload, this.secret, { expiresIn: '1d' });
    }
    verify(token: string): string | JwtPayload {
        return jwt.verify(token, this.secret);
    }
}