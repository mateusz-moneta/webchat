import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AppFacade } from '../../../+state/app.facade';


@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  private requestsCount = 0;
  private requestInProgress = false;

  constructor(private appFacade: AppFacade) {
    this.appFacade.requestInProgress$.subscribe((requestInProgress: boolean) => {
      this.requestInProgress = requestInProgress;
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requestsCount++;
    if (!this.requestInProgress) {
      this.appFacade.setRequestInProgress(true);
    }

    return next.handle(req).pipe(
      catchError(err => {
        throw err;
      }),
      finalize(() => {
        if (--this.requestsCount === 0) {
          this.appFacade.setRequestInProgress(false);
        }
      })
    );
  }
}
