import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLessonDialogComponent } from './create-lesson-dialog.component';

describe('CreateLessonDialogComponent', () => {
  let component: CreateLessonDialogComponent;
  let fixture: ComponentFixture<CreateLessonDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLessonDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLessonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
