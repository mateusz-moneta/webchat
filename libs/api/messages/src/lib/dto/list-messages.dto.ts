import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ListMessagesDto {
  @ApiModelProperty()
  @IsNumber()
  @Type(() => Number)
  conversationId: number;
}
