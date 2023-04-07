import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/Services/api-services/course/course.service';

@Component({
  selector: 'app-instructors-course',
  templateUrl: './instructors-course.component.html',
  styleUrls: ['./instructors-course.component.css'],
})
export class InstructorsCourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private courseServices: CourseService,
    private toastr: ToastrService
  ) {}

  publishedCourse: any;
  unpublishedCourse: any;
  instName: any;
  ngOnInit() {
    let resp: any;
    const instId = this.route.snapshot.params['id'];
    this.courseServices.getAllCourseOfInstructor(instId).subscribe((x) => {
      resp = x;
      if (resp.isSuccess) {
        this.instName = resp.data[0].createdByName;
        const publish = resp.data.filter((c: any) => {
          return c.isPublish === true && c.isDeleted === false;
        });
        this.publishedCourse = publish;
        const unpublish = resp.data.filter((c: any) => {
          return c.isPublish === false && c.isDeleted === false;
        });
        this.unpublishedCourse = unpublish;
      }
    });
  }

  publishCourse(courseId: any) {
    let resp: any;
    this.courseServices.publishCourse(courseId).subscribe((x) => {
      resp = x;
      if (resp.isSuccess) {
        this.toastr.success(resp.message);
        this.ngOnInit();
      }
    });
  }

  deleteCourse(courseId: any) {
    let resp: any;
    this.courseServices.deleteCourse(courseId).subscribe((x) => {
      resp = x;
      if (resp.isSuccess) {
        this.toastr.success(resp.message);
        this.ngOnInit();
      }
    });
  }
}
