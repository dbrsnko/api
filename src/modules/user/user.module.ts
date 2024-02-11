import { DynamicModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CryptoModule } from '../crypto';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';

@Module({})
export class UserModule {
  static forRoot(): DynamicModule {
    return {
      imports: [
        PassportModule.registerAsync({
          useFactory: () => ({
            defaultStrategy: 'jwt',
          }),
        }),
        TypeOrmModule.forFeature([User]),
        CryptoModule.forRoot({
          cryptoHash: 'hash',
        }),
      ],
      controllers: [UserController],
      module: UserModule,
      providers: [UserService],
      exports: [UserService],
    };
  }
}
