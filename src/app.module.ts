import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './modules/auth';

@Module({
    controllers: [],
    providers: [],
    imports: [
        PassportModule.registerAsync({
            useFactory: () => ({
                defaultStrategy: 'jwt',
            }),
        }),
        ConfigModule.forRoot({
            envFilePath: '.env',
            isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                return {
                    type: 'postgres',
                    host: configService.getOrThrow('DATABASE_HOST'),
                    port: Number(process.env.DATABASE_PORT),
                    username: process.env.DATABASE_USER,
                    password: process.env.DATABASE_PASSWORD,
                    database: process.env.DATABASE_DB,
                    entities: [],
                    synchronize: true,
                    autoLoadEntities: true,
                };
            },
        }),
        UserModule.forRoot(),
        AuthModule.forRoot(),
    ],
})
export class AppModule { }
