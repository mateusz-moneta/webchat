import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';

import { WINDOW } from '../providers/window.provider';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  receivingMessage$: Observable<any>;

  private receivingMessageSource = new Subject<any>();
  private url = this.window.location.origin;
  private socket = io(this.url);

  constructor(@Inject(WINDOW) private window: Window) {
    this.receivingMessage$ = this.receivingMessageSource.asObservable();
  }

  getMessages(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  join(data): void {
    this.socket.connect();
    this.socket.emit('join', JSON.stringify(data));
  }

  leave(data): void {
    this.socket.emit('leave', JSON.stringify(data));
    this.socket.disconnect();
  }

  sendMessage(data): void {
    this.socket.emit('message', JSON.stringify(data));
  }
}
