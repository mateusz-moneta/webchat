import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from '@services/auth.service';
import { AppFacade } from '../../+state/app.facade';

@Injectable()
export class ConversationGuard implements CanActivate {

  constructor(private authService: AuthService, private appFacade: AppFacade, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.appFacade.toggleSelectLanguage(false);

    if (this.authService.loggedIn) {
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
