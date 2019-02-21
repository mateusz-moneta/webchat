import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { LoginGuard } from './login.guard';
import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  providers: [
    LoginGuard
  ]
})
export class LoginModule { }
