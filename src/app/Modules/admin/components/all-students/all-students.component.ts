import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/api-services/admin/admin.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent {

  constructor(private adminService: AdminService, private toastr: ToastrService){}

  activeStudents: any;
  blockedStudents: any;

  ngOnInit(): void {
    let resp: any;
    this.adminService.getAllStudents().subscribe(x => {
      resp = x;
      if(resp.isSuccess){
        const active = resp.data.filter((std: any) => {
          return std.isActive === true && std.isDeleted === false;
        });
        this.activeStudents = active;
        const blocked = resp.data.filter((std: any) => {
          return std.isActive === false;
        });
        this.blockedStudents = blocked;
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
