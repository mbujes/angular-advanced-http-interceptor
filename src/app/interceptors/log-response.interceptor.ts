import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class LogResponseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`LogResponseInterceptor - ${req.url}`);

    return next.handle(req)
      .pipe(
        tap(event => {
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
        }),
        catchError(error => {
          console.log('Error from the interceptor');
          return throwError(error)
        })
      )
  }
}
