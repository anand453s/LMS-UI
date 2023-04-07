import { NgModule } from '@angular/core';
import { InstructorComponent } from './instructor.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { RoleGuard } from 'src/app/Guards/role.guard';
import { RouterModule, Routes } from '@angular/router';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { MyCoursesComponent } from '../instructor/components/my-courses/my-courses.component';

const routes: Routes = [
  {
    path: 'instructor',
    component: InstructorComponent,
    children: [
      { path: 'mycourses', component: MyCoursesComponent},
      { path: 'addcourse', component: AddCourseComponent}
    ],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: ['instructor']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstructorRoutingModule { }
