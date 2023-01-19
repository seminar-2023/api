import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { parse } from 'dotenv';
import { readFileSync } from 'fs';

interface EnvConfig {
  [prop: string]: string;
}

export class ConfigService {
  envConfig: EnvConfig;
  private readonly filePath: string = '.env';
  private readonly isLocal;

  constructor() {
    switch (process.env.NODE_ENV) {
      case 'production':
        this.filePath = '.env.production';
        break;
      default:
        this.filePath = '.env';
        break;
    }

    this.envConfig = process.env.DB_HOST
      ? process.env
      : parse(readFileSync(this.filePath, 'utf-8'));

    this.isLocal = this.envConfig.NODE_ENV == 'local';
  }

  get app(): any {
    return {
      appPort: parseInt(this.envConfig.PORT),
      appHostServer: !this.isLocal
        ? this.envConfig.APP_HOST_SERVER
        : `${this.envConfig.APP_HOST_SERVER}:${this.envConfig.PORT}`,
      appHostClient: this.envConfig.APP_HOST_CLIENT,
    };
  }

  get env(): string {
    return process.env.NODE_ENV || 'development';
  }

  get orm_config(): any {
    const pathEntities = ['dist/entities/**/*.entity.js'];

    let configDefault: TypeOrmModuleOptions = {
      type: 'postgres',
      host: this.envConfig.DB_HOST,
      port: +this.envConfig.DB_PORT,
      username: this.envConfig.DB_USERNAME,
      password: this.envConfig.DB_PASSWORD,
      database: this.envConfig.DB_DATABASE,
      synchronize: false,
      ssl: false,
    };

    if (process.env.NODE_ENV === 'production')
      configDefault = {
        type: 'postgres',
        host: this.envConfig.INSTANCE_UNIX_SOCKET,
        port: +this.envConfig.DB_PORT,
        username: this.envConfig.DB_USERNAME,
        password: this.envConfig.DB_PASSWORD,
        database: this.envConfig.DB_DATABASE,
        synchronize: true,
        extra: {
          socketPath: this.envConfig.INSTANCE_UNIX_SOCKET,
        },
        logging: false,
      };

    return {
      develop: {
        ...configDefault,
        name: 'develop',
        entities: pathEntities.map((path) =>
          path.replace('{schema}', 'develop'),
        ),
      },
    };
  }
}

export default new ConfigService();
export const InstanceConfigService = new ConfigService();
