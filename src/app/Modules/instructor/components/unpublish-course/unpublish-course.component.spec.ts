import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpublishCourseComponent } from './unpublish-course.component';

describe('UnpublishCourseComponent', () => {
  let component: UnpublishCourseComponent;
  let fixture: ComponentFixture<UnpublishCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnpublishCourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnpublishCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
