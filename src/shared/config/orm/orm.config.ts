import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/modules/user/entities/user.entity';

dotenvConfig({ path: '.env' });

const entities = [User];

const baseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  entities,
  migrations: ['migrations/*{.ts,.js}'],
  synchronize: false,
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
};

const developmentConfig: TypeOrmModuleOptions = {
  port: parseInt(`${process.env.DATABASE_PORT}`),
  ...baseConfig,
};

const prodConfig: TypeOrmModuleOptions = {
  extra: {
    socketPath: process.env.DATABASE_HOST,
  },
  ...baseConfig,
};

const isDev = process.env.NODE_ENV === 'development';

const config = isDev ? developmentConfig : prodConfig;
console.log(config);
export default config;

export const connectionSource = new DataSource(config as DataSourceOptions);
