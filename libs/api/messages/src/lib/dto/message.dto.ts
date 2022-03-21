import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class MessageDto {
  @ApiModelProperty()
  author: string;

  @ApiModelProperty()
  content: string;

  @ApiModelProperty()
  created_at: Date;

  @ApiModelProperty()
  updated_at: Date;

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }
}
