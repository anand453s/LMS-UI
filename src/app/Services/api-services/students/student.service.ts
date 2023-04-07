import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private client: HttpClient) { }

  private getStudentDetailsUrl = 'https://localhost:7037/api/Student/GetStudentByLoginId';
  private updateStudentDetailsUrl = 'https://localhost:7037/api/Student/UpdateStudentDetails';
  private getAllPublishedCourseUrl = 'https://localhost:7037/api/Course/GetAllPublishedCourse';
  private enrollInCourseUrl = 'https://localhost:7037/api/Course/EnrollInCourse';
  private getAllEnrollCourseUrl = 'https://localhost:7037/api/Course/GetAllEnrollCourse';
  
  getStudentDetails(userId: string){
    const fullUrl = this.getStudentDetailsUrl + '?UserId=' + userId
    return this.client.get(fullUrl);
  }
  
  updateStudentDetails(studentProfileData: string){
    return this.client.put<any>(this.updateStudentDetailsUrl, studentProfileData);
  }
  
  getAllPublishedCourse(){
    return this.client.get(this.getAllPublishedCourseUrl);
  }

  enrollInCourse(data: any){
    return this.client.post<any>(this.enrollInCourseUrl, data);
  }

  getAllEnrollCourse(studentId: any){
    const fullUrl = this.getAllEnrollCourseUrl + '?stdId=' + studentId;
    return this.client.get(fullUrl);
  }
}
