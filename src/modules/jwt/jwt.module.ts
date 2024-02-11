import { DynamicModule, Module, Global, Provider } from '@nestjs/common';
import {
  JwtModuleOptions,
  JwtModuleAsyncOptions,
  JwtModule,
} from '@nestjs/jwt';
import { JWT_PARAMS, JwtTokenService } from './jwt.service';

export interface JwtModuleRegisterOptions extends JwtModuleOptions { }

export interface JwtModuleRegisterAsyncOptions extends JwtModuleAsyncOptions { }

@Global()
@Module({})
export class JwtTokenModule {
  static register(options: JwtModuleRegisterOptions): DynamicModule {
    const jwtParamsProvider: Provider = {
      provide: JWT_PARAMS,
      useValue: {
        secret: options.secret,
        expiresIn: options.signOptions?.expiresIn,
      },
    };

    return {
      module: JwtTokenModule,
      imports: [JwtModule.register(options)],
      providers: [jwtParamsProvider, JwtTokenService],
      exports: [JwtTokenService],
    };
  }

  static registerAsync(options: JwtModuleRegisterAsyncOptions): DynamicModule {
    const jwtParamsProvider: Provider = {
      provide: JWT_PARAMS,
      useFactory: async (...args: unknown[]) => {
        const dynamicOptions = await options.useFactory?.(...args);
        return {
          secret: dynamicOptions?.secret,
          expiresIn: dynamicOptions?.signOptions?.expiresIn,
        };
      },
      inject: options.inject || [],
    };

    return {
      module: JwtTokenModule,
      imports: [JwtModule.registerAsync(options)],
      providers: [jwtParamsProvider, JwtTokenService],
      exports: [JwtTokenService],
    };
  }
}
