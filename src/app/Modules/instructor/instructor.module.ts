import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstructorRoutingModule } from './instructor-routing.module';
import { InstructorComponent } from './instructor.component';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PublishCourseComponent } from './components/publish-course/publish-course.component';
import { UnpublishCourseComponent } from './components/unpublish-course/unpublish-course.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { MyCoursesComponent } from './components/my-courses/my-courses.component';



@NgModule({
  declarations: [
    InstructorComponent,
    UpdateDetailsComponent,
    PublishCourseComponent,
    UnpublishCourseComponent,
    AddCourseComponent,
    MyCoursesComponent
  ],
  imports: [
    CommonModule,
    InstructorRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class InstructorModule { }
