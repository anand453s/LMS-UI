import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { StudentRoutingModule } from './student-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { AllCourseComponent } from './components/all-course/all-course.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    StudentComponent,
    UpdateDetailsComponent,
    MyCourseComponent,
    AllCourseComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class StudentModule { }
