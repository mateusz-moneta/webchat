import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { DialogService } from './services/dialog.service';
import { HttpResponseInterceptor } from './http/http-response-interceptor';
import { HttpService } from '@services/http.service';
import { NotificationService } from './services/notification.service';
import { SharedModule } from '@shared/shared.module';
import { WINDOW_PROVIDERS } from './providers/window.provider';

/**
 * Module for providers for the singleton services. It should be imported by the {@link AppModule} only.
 */

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    AuthService,
    CookieService,
    DialogService,
    HttpService,
    NotificationService,
    WINDOW_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponseInterceptor,
      multi: true
    }
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
    }
  }
}
