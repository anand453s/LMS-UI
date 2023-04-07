import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CourseService } from 'src/app/Services/api-services/course/course.service';
import { InstructorService } from 'src/app/Services/api-services/instructor/instructor.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  public addCourseForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private instructorService: InstructorService, private courseServices: CourseService, private toastrService: ToastrService){}

  ngOnInit(){
    this.addCourseForm = this.formBuilder.group({
      courseName: [null, [Validators.required]],
      courseDesc: [null, [Validators.required]],
      courseCapacity: [10, [Validators.required, Validators.min(10), Validators.max(50)]]
    });

    const titleControl = this.addCourseForm.get('courseName');
    titleControl?.valueChanges.subscribe(x => {
      this.validateTitleControl(titleControl as FormControl);
    });

    const descControl = this.addCourseForm.get('courseDesc');
    descControl?.valueChanges.subscribe(x => {
      this.validateDescControl(descControl as FormControl);
    });

    const capControl = this.addCourseForm.get('courseCapacity');
    capControl?.valueChanges.subscribe(x => {
      this.validateCapControl(capControl as FormControl);
    });
  }

  public titleErrorMsg:string = '';
  public descErrorMsg:string = '';
  public capErrorMsg: string = '';

  private validateTitleControl(titleControl: FormControl): void{
    if(titleControl.errors?.['required'] && (titleControl.touched || titleControl.dirty)){
      this.titleErrorMsg = 'Course tItle is required.';
    }else if(titleControl.valid){
      this.titleErrorMsg = '';
    }
  }

  private validateDescControl(descControl: FormControl): void{
    if(descControl.errors?.['required'] && (descControl.touched || descControl.dirty)){
      this.descErrorMsg = 'Course description is required.';
    }else if(descControl.valid){
      this.descErrorMsg = '';
    }
  }
  private validateCapControl(capControl: FormControl): void{
    if(capControl.errors && (capControl.touched)){
      if(capControl.errors?.['required']){
        this.capErrorMsg = 'Course capacity is required.';
      }else if(!capControl.errors?.['min']){
        this.capErrorMsg = 'Minimum course capacity - 10';
      }else if(!capControl.errors?.['max']){
        this.capErrorMsg = 'Maximum course capacity - 50';
      }
    }else if(capControl.valid){
      this.capErrorMsg = '';
    }
  }

  addCourse(){
    const instId = localStorage.getItem('instructorId');
    debugger
    this.addCourseForm.value.createdBy_InstId = instId

    this.courseServices.addCourse(this.addCourseForm.value).subscribe(x => {
      if(x.isSuccess){
        this.toastrService.success(x.message)
        this.addCourseForm.reset();
      }else{
        this.toastrService.error(x.message)
      }
    })
  }
}
