import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { ApiAuthModule } from '@webchat/api/auth';
import { ApiConversationsModule } from '@webchat/api/conversations';
import { ApiDatabaseModule } from '@webchat/api/database';
import { ApiMessagesModule } from '@webchat/api/messages';
import { ApiUsersModule } from '@webchat/api/users';

@Module({
  imports: [
    ApiAuthModule,
    ApiConversationsModule,
    ApiDatabaseModule,
    ApiMessagesModule,
    ApiUsersModule,
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
