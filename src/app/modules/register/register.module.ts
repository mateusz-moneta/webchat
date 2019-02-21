import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register.component';
import { RegisterGuard } from './register.guard';
import { RegisterRoutingModule } from './register-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RegisterRoutingModule
  ],
  providers: [
    RegisterGuard
  ]
})
export class RegisterModule { }
