import {Module} from "@nestjs/common"
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { RoleModule } from './role/role.module';

@Module({
    controllers:[AppController],
    providers: [AppService],
    imports:[
        ConfigModule.forRoot({
            envFilePath:'.env'
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            entities: [],
            synchronize: true,
            autoLoadEntities: true,
            
          }),
        UserModule,
        RoleModule,
        
          
        
    ]

})
export class AppModule{};