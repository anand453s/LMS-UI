import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscriber } from 'rxjs';
import { InstructorService } from 'src/app/Services/api-services/instructor/instructor.service';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/Services/api-services/course/course.service';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.css']
})
export class MyCoursesComponent implements OnInit{
  publishedCourse: any = null;
  unpublishedCourse: any = null;
  
  constructor(private instructorService: InstructorService, private courseServices: CourseService, private toastrService: ToastrService, private modalService: NgbModal, private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.getCourseOfInstructor();
  }

  getCourseOfInstructor(){
    let resp: any;
    let instId = localStorage.getItem('instructorId');
    this.courseServices.getAllCourseOfInstructor(instId).subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        if(resp.data != null){
          const publish = resp.data.filter((obj:any) => {
            return obj.isActive === true && obj.isPublish === true && obj.isDeleted === false;
          });
          this.publishedCourse = publish;
          
          const unpublish = resp.data.filter((obj:any) => {
          return obj.isActive === true && obj.isPublish === false && obj.isDeleted === false;
          });
          this.unpublishedCourse = unpublish;
        }else{
        this.toastrService.warning(resp.message);
        this.publishedCourse = [];
        this.unpublishedCourse = [];
      }
      }else if(!resp.isSuccess){
        this.toastrService.warning(resp.message);
      }
    }
    );
  }

  deleteCourse(courseId: any){
    this.courseServices.deleteCourse(courseId).subscribe(x => {
      console.log(courseId)
      this.getCourseOfInstructor();
    });
  }

  //Modal Work
  public updateCourseForm: FormGroup = new FormGroup({});
  openUpdateCourse(courseId: any, content:any) {
    let resp: any;
    this.instructorService.getCourseDetails(courseId).subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        if(resp.data != null){
          this.updateCourseForm = this.formBuilder.group({
            courseId: [courseId],
            courseName: [resp.data.courseName, [Validators.required]],
            courseDesc: [resp.data.courseDesc, [Validators.required]],
            courseCapacity: [resp.data.courseCapacity, [Validators.required, Validators.min(10), Validators.max(50)]],
            createdBy_InstId: [resp.data.createdByID]
          });
          this.modalService.open(content, {ariaLabelledBy: 'update-modal'})
        }else{
          this.toastrService.warning(resp.message);
        }
      }else if(!resp.isSuccess){
        this.toastrService.warning("Somthing went wrong.");
      }
    })
  }

  validationMsg:string = '';
  updateCourse(){
    let resp:any;
    if(this.updateCourseForm.invalid){
      this.validationMsg = 'All fields are required.';
      if((this.updateCourseForm.get('courseCapacity') as FormControl).errors){
        this.validationMsg = 'Min. capacity- 10 and Max. capacity - 50.';
      }
    }else{
      this.validationMsg = '';
      this.courseServices.updateCourse(this.updateCourseForm.value).subscribe(x => {
        resp = x;
        if(resp.isSuccess){
          this.toastrService.success(resp.message);
          this.getCourseOfInstructor();
        }
      })
    }
  }

  courseName: string = '';
  public addMaterialForm: FormGroup = new FormGroup({});
  openAddMaterial(courseData: any, content:any){
    this.courseName = courseData.courseName;
    this.addMaterialForm = this.formBuilder.group({
      courseId: [courseData.courseId],
      materialName: [null, [Validators.required]],
      materialDesc: [null, [Validators.required]]
    });
    this.modalService.open(content, {ariaLabelledBy: 'update-modal'})
  }

  addCourseMaterial(){
    if(this.myFile != null){
      this.addMaterialForm.value.file_Base64 = this.myFile;
    }
    let resp:any;
    if(this.addMaterialForm.invalid){
      this.validationMsg = 'All fields are required.';
    }else{
      this.validationMsg = '';
      this.instructorService.addCourseMaterial(this.addMaterialForm.value).subscribe(x => {
        resp = x;
        if(resp.isSuccess){
          this.toastrService.success(resp.message);
          this.getCourseOfInstructor();
        }
      })
    }
  }


  courseMaterial: any;
  openCourseMaterial(course: any, content: any){
    this.courseName = course.courseName;
    this.instructorService.getCourseMaterial(course.courseId).subscribe(x => {
      this.courseMaterial =  x;
      if(this.courseMaterial.isSuccess){
        this.courseMaterial = this.courseMaterial.data;
        this.modalService.open(content, {ariaLabelledBy: 'view-material-modal'});
      }
    })
  }

  deleteMaterial(materialId: any){
    console.log(materialId)
  }

  myFile: any = null;
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
      this.myFile = d;
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
