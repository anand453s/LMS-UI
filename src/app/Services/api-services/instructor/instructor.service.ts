import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private client: HttpClient) { }

  private getInstructorDetailsUrl = 'https://localhost:7037/api/Instructor/GetInstructorByLoginId';
  private updateInstructorDetailsUrl = 'https://localhost:7037/api/Instructor/UpdateInstructorDetails';
  private getCourseDetailsUrl = 'https://localhost:7037/api/Course/GetCourseDetails';
  private addCourseMaterialUrl = 'https://localhost:7037/api/CourseMaterial/AddCourseMaterial';
  private getCourseMaterialUrl = 'https://localhost:7037/api/CourseMaterial/GetCourseMaterial';
  private deleteCourseMaterialUrl = 'https://localhost:7037/api/CourseMaterial/DeleteCourseMaterial';

  getInstructorDetails(userId: string){
    const fullUrl = this.getInstructorDetailsUrl + '?UserId=' + userId
    return this.client.get(fullUrl);
  }

  updateInstructorDetails(instructorProfileData: string){
    return this.client.put<any>(this.updateInstructorDetailsUrl, instructorProfileData);
  }

  getCourseDetails(courseID: any){
    const fullUrl = this.getCourseDetailsUrl + '?courseID=' + courseID;
    return this.client.get(fullUrl);
  }


  addCourseMaterial(courseMaterialDetails: any){
    return this.client.post<any>(this.addCourseMaterialUrl, courseMaterialDetails);
  }
  
  getCourseMaterial(courseId: any){
    const fullUrl = this.getCourseMaterialUrl + '?courseId=' + courseId;
    return this.client.get(fullUrl);
  }

  deleteCourseMaterial(materialID: any){
    const fullUrl = this.deleteCourseMaterialUrl + '?courseMaterialId=' + materialID;
    return this.client.delete(fullUrl);
  }
}
