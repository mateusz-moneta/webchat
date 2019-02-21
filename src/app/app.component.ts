import { Component } from '@angular/core';
import { AppFacade } from './+state/app.facade';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  showSelectLanguage$ = this.appFacade.showSelectLanguage$;

  constructor(private appFacade: AppFacade) {}
}
