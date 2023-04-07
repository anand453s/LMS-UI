import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpErrorResponse
// } from '@angular/common/http';
// import { Observable, catchError } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from "@angular/common/http";
import { throwError, Observable, BehaviorSubject, of, finalize } from "rxjs";
import { catchError, filter, take, switchMap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
            .pipe(
                catchError((err: HttpErrorResponse) => {
                  // console.log(err)
                  if (err.status == 404 || err.status == 400) {
                    this.toastr.error(err.error.message)
                    return of(err.error)
                  }else if(err.status == 401){
                    this.toastr.error("Unauthorized");
                    return of(err)
                  }else if(err.status == 403){
                    this.toastr.error("Forbidden");
                    return of(err.error)
                  }else if(err.status == 0){
                    this.toastr.error("Server not responding.");
                    return of(err.error)
                  }else if(err.status == 500){
                    this.toastr.error("Unable to connect with database.");
                    return of(err.error)
                  }
                  this.toastr.error("Somthing went wrong.");
                  return of(err.error);
                })
            )
  }
}
