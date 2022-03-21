import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

import { LoginComponent } from './containers/login/login.component';
import { WebchatLoginFeatureRouting } from './webchat-login-feature.routing';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    WebchatLoginFeatureRouting
  ],
  declarations: [
    LoginComponent
  ],
})
export class WebchatLoginFeatureModule {}
