import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { InstructorService } from 'src/app/Services/api-services/instructor/instructor.service';
import { TransferdataService } from 'src/app/Services/other/transferdata.service';

@Component({
  selector: 'app-update-details',
  templateUrl: './update-details.component.html',
  styleUrls: ['./update-details.component.css']
})
export class UpdateDetailsComponent {
  public data: any;
  public editProfile: FormGroup = this.formBuilder.group({});
  myImage: any = null;
  
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private instructorService: InstructorService,
    private router: Router,
    private transferData: TransferdataService){}

  ngOnInit(): void {
    this.editProfile = this.formBuilder.group({
      userId: [this.data.userId],
      fullName: [this.data.fullName],
      email: [this.data.email],
      mobile: [this.data.mobile, [Validators.min(5555555555), Validators.max(9999999999)]],
      gender: [this.data.gender],
      specialization: [this.data.specialization],
      experience: [this.data.experience]
    });
  }

  updateProfile(){
    if(this.myImage != null){
      this.editProfile.value.profilePic = this.myImage;
    }
    if(this.editProfile.valid){
      this.instructorService.updateInstructorDetails(this.editProfile.value).subscribe(x => {
        if(x.isSuccess){
          this.toastr.success(x.message);
          this.transferData.setProfile(this.data.profilePic);
          this.router.navigate(['/instructor/published']);
        }
      });
    }else{
      this.toastr.warning('Invalid form');
    }
  }

  onImgChange($event: Event){
    const target = $event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    this.convertToBase64code(file); 
  }

  convertToBase64code(file: File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    })
    observable.subscribe((d) =>{
      this.myImage = d;
    })
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () =>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror =() => {
      subscriber.error(null);
      subscriber.complete();
    }
  }
}
