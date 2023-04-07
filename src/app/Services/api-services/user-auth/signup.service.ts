import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private getUserRoleurl = 'https://localhost:7037/api/Login/GetRoleTypes';
  private signupUrl = "https://localhost:7037/api/Login/SignUp"
  
  constructor(private client: HttpClient) {}
  getUserRoles(){
    return this.client.get(this.getUserRoleurl);
  }

  registerUser(registerDetails: any){
    return this.client.post<any>(this.signupUrl, registerDetails);
  }
}
