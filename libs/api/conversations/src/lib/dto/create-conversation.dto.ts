import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateConversationDto {
  @ApiModelProperty()
  @IsOptional()
  name?: string;

  @ApiModelProperty()
  @IsNumber({ maxDecimalPlaces: 0 }, { each: true })
  @Type(() => Number)
  users: number[];
}
