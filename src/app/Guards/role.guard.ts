import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private toastr: ToastrService, private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.isAuthorize(route)){
        return true;
      }else{
        this.toastr.warning('You are not authorised to this resourse.');
        this.router.navigate(['/login']);
        return false;
      }
  }

  private isAuthorize(route: ActivatedRouteSnapshot): boolean{
    const role = [localStorage.getItem('roleType')?.toLowerCase()];
    const expectedRole = route.data['expectedRole'];
    const roleMatches = role.findIndex(role => expectedRole.indexOf(role) != -1);
    return roleMatches < 0 ? false : true;
  }
}
