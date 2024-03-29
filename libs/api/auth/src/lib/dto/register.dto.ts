import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

import { passwordConfig } from '../config/password.config';
import { UniqueOnDatabase } from '../validators/unique.validator';
import { User } from '@webchat/api/database';

export class RegisterDto {
  @ApiModelProperty()
  @IsString()
  @UniqueOnDatabase(User)
  @Length(2, 30)
  username: string;

  @ApiModelProperty()
  @IsString()
  @Length(4, 20)
  @Matches(passwordConfig)
  password: string;

  @ApiModelProperty()
  @IsEmail()
  email: string;
}
