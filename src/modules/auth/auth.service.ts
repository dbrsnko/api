import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user';
import { UserRole } from 'src/shared/types';
import { CryptoService } from '../crypto';
import { JwtTokenService } from '../jwt';

export interface SingUpParams {
  email: string;
  password: string;
  role?: UserRole;
}

export interface SignInParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
    private readonly jwtService: JwtTokenService,
  ) { }

  async signUp(params: SingUpParams) {
    const { email, password, role = UserRole.User } = params;

    const userWithSameEmail = await this.userService.findByEmail(email);

    if (userWithSameEmail) {
      throw new ConflictException('User with same email already exists');
    }

    const passwordHash = await this.cryptoService.hash(password);

    const user = await this.userService.create({
      email,
      passwordHash,
      role,
    });

    const token = await this.jwtService.createToken({
      id: user.id,
      role: user.role,
      email: user.email,
    });

    return {
      accessToken: token,
    };
  }

  async signIn(params: SignInParams) {
    const { email, password } = params;

    const userCandidate = await this.userService.findByEmail(email);

    if (!userCandidate) {
      throw new NotFoundException('User not found');
    }

    const isValidPassword = await this.cryptoService.compare(
      password,
      userCandidate.passwordHash,
    );

    if (!isValidPassword) {
      throw new ConflictException('Invalid password');
    }

    const token = await this.jwtService.createToken({
      id: userCandidate.id,
      role: userCandidate.role,
      email: userCandidate.email,
    });

    return {
      accessToken: token,
    };
  }
}
