import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiModelProperty()
  @IsNumber()
  @Type(() => Number)
  authorId: number;

  @ApiModelProperty()
  @IsString()
  content: string;

  @ApiModelProperty()
  @IsNumber()
  @Type(() => Number)
  conversationId: number;
}
