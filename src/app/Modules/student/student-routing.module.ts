import { NgModule } from '@angular/core';
import { StudentComponent } from './student.component';
import { UpdateDetailsComponent } from './components/update-details/update-details.component';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/Guards/role.guard';
import { AuthGuard } from 'src/app/Guards/auth.guard';
import { MyCourseComponent } from './components/my-course/my-course.component';
import { AllCourseComponent } from './components/all-course/all-course.component';

const routes: Routes = [
  {
    path: 'student',
    component: StudentComponent,
    children: [
      { path: 'mycourse', component: MyCourseComponent },
      { path: 'allcourse', component: AllCourseComponent },
      { path: 'update', component: UpdateDetailsComponent }
    ],
    canActivate: [AuthGuard,RoleGuard],
    data: {
      expectedRole: ['student']
    }
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
