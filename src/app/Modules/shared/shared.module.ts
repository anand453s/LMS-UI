import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbCollapseModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    SharedRoutingModule
  ]
})
export class SharedModule { }
