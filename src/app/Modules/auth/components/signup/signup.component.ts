import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from 'src/app/Services/api-services/user-auth/signup.service';
import { ToastrService } from 'ngx-toastr';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [SignupService]
})
export class SignupComponent {
  
  userRoles:any;
  
  public signupForm: FormGroup = new FormGroup({});
  
  constructor(private signupService: SignupService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService){}
  
  ngOnInit(){
    this.signupForm = this.formBuilder.group({
      fullName: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      cnfPass: [null, Validators.required],
      roleId: [null, Validators.required]
    });

    let resp:any;
    this.signupService.getUserRoles().subscribe((response) =>{
      resp = response;
      if(resp.isSuccess){
        this.userRoles = resp.data;
      }
    });
    
    const nameControl = this.signupForm.get('fullName');
    nameControl?.valueChanges.subscribe(x => {
      this.validateNameControl(nameControl as FormControl);
    });

    const emailControl = this.signupForm.get('email');
    emailControl?.valueChanges.subscribe(x => {
      this.validateEmailControl(emailControl as FormControl);
    });

    const passwordControl = this.signupForm.get('password');
    passwordControl?.valueChanges.subscribe(x => {
      this.validatePasswordControl(passwordControl as FormControl);
    });

    const cnfPassControl = this.signupForm.get('cnfPass');
    cnfPassControl?.valueChanges.subscribe(x => {
      this.validateCnfPasswordControl(cnfPassControl as FormControl, passwordControl as FormControl);
    });

    const roleControl = this.signupForm.get('roleId');
    roleControl?.valueChanges.subscribe(x => {
      this.validateRoleControl(roleControl as FormControl);
    });
  }
  
  public nameErrorMsg:string = '';
  public emailErrorMsg:string = '';
  public passwordErrorMsg:string = '';
  public cnfPassErrorMsg:string = '';
  public roleErrorMsg:string = '';
  
  private validateNameControl(nameControl: FormControl): void{
    if(nameControl.errors && (nameControl.touched || nameControl.dirty)){
      if(nameControl.errors?.['required']){
        this.nameErrorMsg = 'Name is required.';
      }else if(!nameControl.errors?.['minLength']){
        this.nameErrorMsg = 'Name must be of minimum 3 charators.';
      }
    }else if(nameControl.valid){
      this.nameErrorMsg = '';
    }
  }

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
    if(passwordControl.errors && (passwordControl.touched || passwordControl.dirty)){
      if(passwordControl.errors?.['required']){
        this.passwordErrorMsg = 'Password is required.';
      }else if(!passwordControl.errors?.['minLength']){
        this.passwordErrorMsg = 'Password must be of minimum 6 charators.';
      }
    }else if(passwordControl.valid){
      this.passwordErrorMsg = '';
    }
  }

  private validateCnfPasswordControl(cnfPassControl: FormControl, passwordControl: FormControl): void{
    if(cnfPassControl.touched || cnfPassControl.dirty){
      if(!this.confirmPassword(passwordControl.value, cnfPassControl.value)){
        this.cnfPassErrorMsg = 'Password not matching'
      }else{
        this.cnfPassErrorMsg = '';
      }
    }
  }

  private validateRoleControl(roleControl: FormControl): void{
    if((roleControl.touched || roleControl.dirty)){
      if(roleControl.errors?.['required']){
        this.roleErrorMsg = 'Please select role';
      }
      if(roleControl.value == "Select your role"){
        this.roleErrorMsg = 'Please select your role';
        roleControl.setErrors({'incorrect': true});
      }else{
        this.roleErrorMsg = '';
      }
    }
  }

  confirmPassword( password: string, cnfPass: string ): boolean{
    if(password === cnfPass){
      return true;
    }
    return false;
  }

  signup():void {
    if(this.signupForm.valid){
      this.signupService.registerUser(this.signupForm.value).subscribe(x => {
        if(x.isSuccess){
          this.toastr.success(x.message)
          this.router.navigate(['/login']);
        }
      });
    }else{
      this.toastr.warning('Invalid form');
    }
  }
}
