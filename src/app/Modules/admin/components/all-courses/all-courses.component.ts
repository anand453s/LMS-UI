import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/api-services/admin/admin.service';
import { CourseService } from 'src/app/Services/api-services/course/course.service';

@Component({
  selector: 'app-all-courses',
  templateUrl: './all-courses.component.html',
  styleUrls: ['./all-courses.component.css']
})
export class AllCoursesComponent {

  constructor(private courseServices: CourseService, private toastr: ToastrService){}

  publishedCourse: any;
  unpublishedCourse: any;

  ngOnInit(): void {
    let resp: any;
    this.courseServices.getAllCourse().subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        const publish = resp.data.filter((c: any) => {
          return c.isPublish === true && c.isDeleted === false;
        });
        this.publishedCourse = publish;
        const unpublish = resp.data.filter((c: any) => {
          return c.isPublish === false && c.isDeleted === false;
        });
        this.unpublishedCourse = unpublish;
      }
    })
  }

  publishCourse(courseId: any){
    let resp:any;
    this.courseServices.publishCourse(courseId).subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        this.toastr.success(resp.message);
        this.ngOnInit();
      }
    })
  }

  deleteCourse(courseId: any){
    let resp:any;
    this.courseServices.deleteCourse(courseId).subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        this.toastr.success(resp.message);
        this.ngOnInit();
      }
    })
  }
}
