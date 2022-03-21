import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsString, Length, Matches } from 'class-validator';

import { passwordConfig } from '../config/password.config';

export class ChangePasswordDto {
  @ApiModelProperty()
  @IsString()
  @Length(2, 30)
  username: string;

  @ApiModelProperty()
  @IsString()
  @Length(4, 20)
  @Matches(passwordConfig)
  password: string;
}
