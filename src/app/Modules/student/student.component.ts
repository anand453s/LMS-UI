import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/Services/api-services/students/student.service';
import { TransferdataService } from 'src/app/Services/other/transferdata.service';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit{

  data: any;
  resp: any;
  userId: any;

  constructor(private studentService: StudentService, private transferData: TransferdataService){}

  ngOnInit(): void {
    this.userId =  localStorage.getItem('userId');
    if(this.userId != null && this.userId != ''){
      this.getStudentData();
    }
  }

  getStudentData(){
    this.studentService.getStudentDetails(this.userId).subscribe(response => {
      this.resp = response;
      if(this.resp.isSuccess){
        this.data = this.resp.data;
        localStorage.setItem('profilePic', this.data.profilePic);
        localStorage.setItem('studentId',this.data.studentId);
        this.transferData.setProfile(this.data.profilePic);
      }
    })
  }

  onOutletLoaded(component: UpdateDetailsComponent){
    this.getStudentData();
    component.data = this.data;
  }
}
