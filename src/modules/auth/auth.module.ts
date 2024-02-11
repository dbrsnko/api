import { DynamicModule, Module } from '@nestjs/common';
import { CryptoModule } from '../crypto';
import { AuthService } from './auth.service';
import { JwtTokenModule } from '../jwt';
import { AuthController } from './auth.controller';
import { UserModule } from '../user';
import { JwtStrategy } from './strategies';
import { PassportModule } from '@nestjs/passport';

@Module({})
export class AuthModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        CryptoModule.forRoot({
          cryptoHash: 'hash',
        }),
        JwtTokenModule.register({
          global: true,
          secret: 'dsadad',
          signOptions: {
            expiresIn: '1h',
          },
        }),
        PassportModule.registerAsync({
          useFactory: () => ({
            defaultStrategy: 'jwt',
          }),
        }),
        UserModule.forRoot(),
      ],
      controllers: [AuthController],
      module: AuthModule,
      providers: [AuthService, JwtStrategy],
      exports: [AuthService],
    };
  }
}
