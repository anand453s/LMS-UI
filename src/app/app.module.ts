import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './Modules/auth/auth.module';
import { SharedModule } from './Modules/shared/shared.module';
import { PublicModule } from './Modules/public/public.module';
import { PageNotFoundComponent } from './Modules/shared/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HeaderInterceptor } from './Interceptor/header.interceptor';
import { RoleGuard } from './Guards/role.guard';
import { StudentModule } from './Modules/student/student.module';
import { AuthGuard } from './Guards/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { StudentService } from './Services/api-services/students/student.service';
import { LoginService } from './Services/api-services/user-auth/login.service';
import { SignupService } from './Services/api-services/user-auth/signup.service';
import { InstructorModule } from './Modules/instructor/instructor.module';
import { InstructorService } from './Services/api-services/instructor/instructor.service';
import { TransferdataService } from './Services/other/transferdata.service';
import { ErrorCatchingInterceptor } from './Interceptor/error-catching.interceptor';
import { AdminModule } from './Modules/admin/admin.module';
import { AdminService } from './Services/api-services/admin/admin.service';
import { CourseService } from './Services/api-services/course/course.service';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    AuthModule,
    StudentModule,
    InstructorModule,
    AdminModule,
    PublicModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: "toast-bottom-right",
      preventDuplicates: true,
      timeOut: 2500,
      easing: "ease-in",
      easeTime: 1000
    }),
  ],
  providers: [
    TransferdataService,
    InstructorService,
    StudentService,
    CourseService,
    LoginService,
    SignupService,
    AdminService,
    RoleGuard,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }