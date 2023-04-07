import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AllInstructorsComponent } from './components/all-instructors/all-instructors.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { InstructorsCourseComponent } from './components/instructors-course/instructors-course.component';



@NgModule({
  declarations: [
    AdminComponent,
    AllInstructorsComponent,
    DashboardComponent,
    AllStudentsComponent,
    AllCoursesComponent,
    InstructorsCourseComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
