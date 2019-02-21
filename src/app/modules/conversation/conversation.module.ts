import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConversationRoutingModule } from './conversation-routing.module';
import { ConversationComponent} from './conversation.component';
import { ConversationGuard } from './conversation.guard';
import { MessageComponent } from './components/message/message.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    ConversationComponent,
    MessageComponent
  ],
  entryComponents: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    ConversationRoutingModule,
    SharedModule
  ],
  providers: [
    ConversationGuard
  ]
})
export class ConversationModule { }
