import { AuthService } from "./app/auth.service";
import { UserRepo } from "./infra/repos/user.repo";
import { BcryptHasher } from "./infra/security/bcryptHasher";
import { JwtProvider } from "./infra/security/jwtProvider";

const userRepo = new UserRepo();
const hasher = new BcryptHasher();
const tokenProvider = new JwtProvider();

export const authService = new AuthService(userRepo, hasher, tokenProvider);