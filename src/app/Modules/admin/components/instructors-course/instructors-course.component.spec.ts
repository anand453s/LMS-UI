import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorsCourseComponent } from './instructors-course.component';

describe('InstructorsCourseComponent', () => {
  let component: InstructorsCourseComponent;
  let fixture: ComponentFixture<InstructorsCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorsCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorsCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
