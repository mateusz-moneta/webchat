import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ApiAuthModule } from '@webchat/api/auth';
import { ApiDatabaseModule } from '@webchat/api/database';
import { ApiUsersDatabaseModule } from '@webchat/api/users-database';

@Module({
  imports: [
    ApiAuthModule,
    ApiDatabaseModule,
    ApiUsersDatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
      isGlobal: true
    })
  ]
})
export class AppModule {}
