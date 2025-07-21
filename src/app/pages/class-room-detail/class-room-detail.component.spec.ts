import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomDetailComponent } from './class-room-detail.component';

describe('ClassRoomDetailComponent', () => {
  let component: ClassRoomDetailComponent;
  let fixture: ComponentFixture<ClassRoomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoomDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassRoomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
