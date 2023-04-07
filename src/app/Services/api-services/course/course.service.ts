import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private client: HttpClient) { }
  
  private addCourseUrl = 'https://localhost:7037/api/Course/AddCourse';
  private deleteCourseUrl = 'https://localhost:7037/api/Course/DeleteCourse';
  private updateCourseUrl = 'https://localhost:7037/api/Course/UpdateCourse';
  private getAllCourseUrl = 'https://localhost:7037/api/Admin/GetAllCourse';
  private publishCourseUrl = 'https://localhost:7037/api/Admin/PublishCourse';
  private getAllCourseOfInstructorUrl = 'https://localhost:7037/api/Course/GetAllCourseOfInstructor';


  addCourse(courseDetails: any){
    return this.client.post<any>(this.addCourseUrl, courseDetails);
  }

  deleteCourse(courseID: any){
    const fullUrl = this.deleteCourseUrl + '?courseID=' + courseID;
    return this.client.delete(fullUrl);
  }

  
  getAllCourseOfInstructor(instId: any){
    const fullUrl = this.getAllCourseOfInstructorUrl + '?instId=' + instId;
    return this.client.get(fullUrl);
  }

  updateCourse(updateCourseData: string){
    return this.client.put<any>(this.updateCourseUrl, updateCourseData)
  }
  
  getAllCourse(){
    return this.client.get(this.getAllCourseUrl);
  }

  publishCourse(courseId: any){
    const fullUrl = this.publishCourseUrl + '?courseId=' + courseId;
    return this.client.post<any>(fullUrl,null);
  }
}
