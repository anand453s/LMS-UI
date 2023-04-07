import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let jwtToken = localStorage.getItem('jwtToken');
    if(jwtToken != null && jwtToken != ''){
      const req = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + jwtToken
        }
      });
      return next.handle(req);
    }
    return next.handle(request);
  }
}
