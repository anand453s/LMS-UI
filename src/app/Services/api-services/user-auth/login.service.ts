import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userLoginUrl = 'https://localhost:7037/api/Login/Login'
  constructor(private client: HttpClient, private toastr: ToastrService) {

   }
  userLogin(loginDetails: any){
    return this.client.post<any>(this.userLoginUrl,loginDetails)
  }
}
