import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  jwt: any;
  constructor(private toastr: ToastrService, private router: Router){}
  canActivate(){
    // route: ActivatedRouteSnapshot,
    // state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.jwt = localStorage.getItem('jwtToken');
    if(this.jwt != null && this.jwt != ''){
      return true;
    }else{
      this.toastr.warning('First login to your account.');
      debugger
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
