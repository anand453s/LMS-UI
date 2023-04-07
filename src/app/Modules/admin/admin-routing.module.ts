import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { RoleGuard } from 'src/app/Guards/role.guard';
import { RouterModule, Routes } from '@angular/router';
import { AllInstructorsComponent } from './components/all-instructors/all-instructors.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AllStudentsComponent } from './components/all-students/all-students.component';
import { AllCoursesComponent } from './components/all-courses/all-courses.component';
import { InstructorsCourseComponent } from './components/instructors-course/instructors-course.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'home', component: DashboardComponent},
      { path: 'allinstructors', component: AllInstructorsComponent},
      { path: 'allstudents', component: AllStudentsComponent},
      { path: 'allcourses', component: AllCoursesComponent},
      { path: 'instructorscourse/:id', component: InstructorsCourseComponent}
    ],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: ['admin']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
