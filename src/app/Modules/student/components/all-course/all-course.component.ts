import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { StudentService } from 'src/app/Services/api-services/students/student.service';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.css']
})
export class AllCourseComponent implements OnInit {

  publishedCourse:any;

  constructor(private studentServise: StudentService, private toastrService: ToastrService){}
  
  ngOnInit(){
    let resp:any;
    this.studentServise.getAllPublishedCourse().subscribe(response => {
      resp = response;
      if(resp.isSuccess){
        this.publishedCourse = resp.data;
      }
    })
  }

  enroll(courseId: any){
    const stdId = localStorage.getItem('studentId');
    let enrollData = {
      studentId: stdId,
      courseId: courseId
    }
    this.studentServise.enrollInCourse(enrollData).subscribe(x => {
      if(x.isSuccess){
        this.toastrService.success(x.message)
      }else{
        this.toastrService.error(x.message)
      }
    })
  }
}
