import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/api-services/admin/admin.service';

@Component({
  selector: 'app-all-instructors',
  templateUrl: './all-instructors.component.html',
  styleUrls: ['./all-instructors.component.css']
})
export class AllInstructorsComponent implements OnInit {

  constructor(private adminService: AdminService, private toastr: ToastrService, private router: Router){}

  activeInstructors: any;
  blockedInstructor: any;

  ngOnInit(): void {
    let resp: any;
    this.adminService.getAllInstructors().subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        const active = resp.data.filter((inst: any) => {
          return inst.isActive === true && inst.isDeleted === false;
        });
        this.activeInstructors = active;
        const blocked = resp.data.filter((inst: any) => {
          return inst.isActive === false;
        });
        this.blockedInstructor = blocked;
      }
    })
  }

  toggleBlock(userId:any){
    let resp:any;
    this.adminService.toggleBlockUser(userId).subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        this.toastr.success(resp.message);
        this.ngOnInit();
      }
    })
  }
}
