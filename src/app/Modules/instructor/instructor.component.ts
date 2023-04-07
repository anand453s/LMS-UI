import { Component, OnInit } from '@angular/core';
import { InstructorService } from 'src/app/Services/api-services/instructor/instructor.service';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { TransferdataService } from 'src/app/Services/other/transferdata.service';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent implements OnInit{

  data: any;
  resp: any;
  userId: any;

  constructor(private instructorService: InstructorService, private transferData: TransferdataService){
  }

  ngOnInit(): void {
    this.userId =  localStorage.getItem('userId');
    if(this.userId != null && this.userId != ''){
      this.getInstructorData();
    }
  }

  getInstructorData(){
    this.instructorService.getInstructorDetails(this.userId).subscribe(response => {
      this.resp = response;
      if(this.resp.isSuccess){
        this.data = this.resp.data;
        localStorage.setItem('profilePic', this.data.profilePic);
        localStorage.setItem('instructorId',this.data.instructorId);
        this.transferData.setProfile(this.data.profilePic);
      }
    })
  }

  onUpdateDetailsLoaded(component: UpdateDetailsComponent){
    this.getInstructorData();
    component.data = this.data;
  }
}
