import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConversationComponent } from './conversation.component';
import { ConversationGuard } from './conversation.guard';

const routes: Routes = [
  {
    path: '',
    component: ConversationComponent,
    canActivate: [ConversationGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConversationRoutingModule { }
