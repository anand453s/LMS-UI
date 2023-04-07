import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private client: HttpClient) {}

  private getAllInstructorsUrl = 'https://localhost:7037/api/Admin/GetAllInstructors';
  private getAllStudentsUrl = 'https://localhost:7037/api/Admin/GetAllStudents';
  private toggleBlockUserUrl = 'https://localhost:7037/api/Admin/ToggleBlockUser';

  getAllInstructors(){
    return this.client.get(this.getAllInstructorsUrl);
  }

  getAllStudents(){
    return this.client.get(this.getAllStudentsUrl);
  }
  
  toggleBlockUser(UserId: any){
    const fullUrl = this.toggleBlockUserUrl + '?UserId=' + UserId;
    return this.client.post<any>(fullUrl,null);
  }

}
