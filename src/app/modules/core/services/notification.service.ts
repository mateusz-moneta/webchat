import { Injectable } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private options = {
    timeOut: 5000,
    showProgressBar: true,
    pauseOnHover: true,
    clickToClose: true,
    animate: 'fromRight'
  };

  constructor(private _notifications: NotificationsService) { }

  open(title: string, content: string, type) {
    this._notifications.create(title, content, type, this.options);
  }
}
