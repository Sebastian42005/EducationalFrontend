import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLessonEditComponent } from './admin-lesson-edit.component';

describe('AdminLessonEditComponent', () => {
  let component: AdminLessonEditComponent;
  let fixture: ComponentFixture<AdminLessonEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminLessonEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLessonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
