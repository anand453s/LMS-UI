import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/api-services/user-auth/login.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent {

  public loginForm: FormGroup;

  constructor(private loginServices: LoginService, private formBuilder: FormBuilder, private route: Router, private toastr: ToastrService){
    this.loginForm = formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(){
    const emailControl = this.loginForm.get('email');
    emailControl?.valueChanges.subscribe(x => {
      this.validateEmailControl(emailControl as FormControl);
    });

    const passwordControl = this.loginForm.get('password');
    passwordControl?.valueChanges.subscribe(x => {
      this.validatePasswordControl(passwordControl as FormControl);
    });
  }

  public emailErrorMsg:string = '';
  public passwordErrorMsg:string = '';

  private validateEmailControl(emailControl: FormControl): void{
    if(emailControl.errors && (emailControl.touched || emailControl.dirty)){
      if(emailControl.errors?.['required']){
        this.emailErrorMsg = 'Email is required.';
      }else if(emailControl.errors?.['email']){
        this.emailErrorMsg = 'Please enter valid Email';
      }
    }else if(emailControl.valid){
      this.emailErrorMsg = '';
    }
  }

  private validatePasswordControl(passwordControl: FormControl): void{
    if(passwordControl.errors?.['required'] && (passwordControl.touched || passwordControl.dirty)){
      this.passwordErrorMsg = 'Password is required.';
    }else if(passwordControl.valid){
      this.passwordErrorMsg = '';
    }
  }

  userRoleType:string= '';
  login():void {
    if(this.loginForm.valid){
      this.loginServices.userLogin(this.loginForm.value).subscribe(x => {
        if(x.isSuccess){
          localStorage.setItem('jwtToken', x.data.token);
          localStorage.setItem('userId', x.data.userId);
          localStorage.setItem('roleType', x.data.roleType);
          this.toastr.success(x.message);
          this.userRoleType = x.data.roleType.toString().toLowerCase();
          if(this.userRoleType === 'student'){
            this.route.navigate(['/student/mycourse']);
          }else if(this.userRoleType === 'instructor'){
            this.route.navigate(['/instructor/mycourses']);
          }else if(this.userRoleType === 'admin'){
            this.route.navigate(['/admin/home']);
          }
        }
      });
    }
  }
}
