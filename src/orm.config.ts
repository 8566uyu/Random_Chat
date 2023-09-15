import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Article } from './domain/article.entity'

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCHRONIZE: false,
    ENTITIES: [__dirname + '/domain/*.entity{.ts,.js}'],
    MIGRATIONS: [__dirname + '/migrations/**/*{.ts,.js}'],
    CLI: {
      migrationsDir: 'src/migrations',
    },
    MIGRATIONS_RUN: false,
  };
  
  const ormconfig: TypeOrmModuleOptions = {
    type: 'mysql',
    database: 'chat',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '0531',
    logging: true,
    synchronize: commonConf.SYNCHRONIZE,
    entities: commonConf.ENTITIES,
    migrations: commonConf.MIGRATIONS,
    // cli: commonConf.CLI,
    migrationsRun: commonConf.MIGRATIONS_RUN,
  };
  
  return ormconfig;
}

export { ormConfig };
