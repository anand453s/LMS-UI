import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-publish-course',
  templateUrl: './publish-course.component.html',
  styleUrls: ['./publish-course.component.css']
})
export class PublishCourseComponent {
  @Input() courses:any;
  @Output() deleteEvent = new EventEmitter<any>();
  @Output() updateEvent = new EventEmitter<any>();
  @Output() addMaterialEvent = new EventEmitter<any>();
  @Output() viewMaterialEvent = new EventEmitter<any>();
  

  deleteCourse(value: any) {
    this.deleteEvent.emit(value);
  }

  updateCourse(courseId: any){
    this.updateEvent.emit(courseId);
  }

  addCourseMaterial(course: any){
    this.addMaterialEvent.emit(course);
  }
  viewCourseMaterial(course: any){
    this.viewMaterialEvent.emit(course);
  }
}
