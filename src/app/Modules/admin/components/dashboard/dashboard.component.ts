import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/Services/api-services/admin/admin.service';
import { CourseService } from 'src/app/Services/api-services/course/course.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private adminServices: AdminService, private courseServices: CourseService){}

  instructors:number = 0;
  students:number = 0;
  publishedCourse:number = 0;
  unpublishedCourse: number = 0;
  ngOnInit(): void {
    this.adminServices.getAllInstructors().subscribe(x =>{
      let resp: any;
      resp = x;
      if(resp.isSuccess){
        this.instructors = resp.data.length;
      }
    });

    this.adminServices.getAllStudents().subscribe(x => {
      let resp: any;
      resp = x;
      if(resp.isSuccess){
        this.students = resp.data.length;
      }
    });

    this.courseServices.getAllCourse().subscribe(x => {
      let resp: any;
      resp = x;
      if(resp.isSuccess){
        console.log(resp.data)
        this.publishedCourse = resp.data.filter((c: any) => {
          return c.isPublish === true && c.isDeleted === false;
        }).length;
        this.unpublishedCourse = resp.data.filter((c: any) => {
          return c.isPublish === false && c.isDeleted === false;
        }).length;
      }
    });
  }
}
