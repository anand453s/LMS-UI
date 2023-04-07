import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InstructorService } from 'src/app/Services/api-services/instructor/instructor.service';
import { StudentService } from 'src/app/Services/api-services/students/student.service';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent {
  allEnrolledCourse:any;

  constructor(private studentService: StudentService, private instructorService: InstructorService, private modalService: NgbModal){}
  
  ngOnInit(){
    let resp:any;
    const studentId = localStorage.getItem('studentId');
    this.studentService.getAllEnrollCourse(studentId).subscribe(response => {
      resp = response;
      if(resp.isSuccess){
        this.allEnrolledCourse = resp.data;
      }
    })
  }

  courseName = '';
  courseMaterial: any;
  viewCourseMaterial(content: any, courseId: any, courseName: string){
    this.courseName = courseName;
    this.instructorService.getCourseMaterial(courseId).subscribe(x => {
      this.courseMaterial =  x;
      if(this.courseMaterial.isSuccess){
        this.courseMaterial = this.courseMaterial.data;
        this.modalService.open(content, {ariaLabelledBy: 'view-material-modal'});
      }
    })
  }
  
}
