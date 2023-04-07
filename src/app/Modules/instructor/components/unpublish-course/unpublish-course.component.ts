import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-unpublish-course',
  templateUrl: './unpublish-course.component.html',
  styleUrls: ['./unpublish-course.component.css']
})
export class UnpublishCourseComponent{
  @Input() courses:any;
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();

  deleteCourse(courseId: any) {
    this.deleteEvent.emit(courseId);
  }

  updateCourse(courseId: any){
    this.updateEvent.emit(courseId);
  }
  
}
