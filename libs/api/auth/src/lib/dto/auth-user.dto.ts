import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

import { UserDto } from './user.dto';

export class AuthUserDto extends UserDto {
  @ApiModelProperty()
  accessToken: string;
}
