import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TransferdataService } from 'src/app/Services/other/transferdata.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Input() fullName = '';
  profilePic = '';

  public isCollapsed = true;
  public role: string|null = localStorage.getItem('roleType');

  constructor(private router: Router,
    private toastrService: ToastrService,
    private transferData: TransferdataService) { }

  ngOnInit(){
    this.transferData.getProfile().subscribe(x=>{
      this.profilePic = x;
    })
  }

  logout(){
    localStorage.clear();
    this.toastrService.info('Logout Successfully.');
    this.router.navigate(['']);
  }

}
