import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register.component';
import { RegisterGuard } from './register.guard';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    canActivate: [RegisterGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
