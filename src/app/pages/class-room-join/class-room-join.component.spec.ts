import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomJoinComponent } from './class-room-join.component';

describe('ClassRoomJoinComponent', () => {
  let component: ClassRoomJoinComponent;
  let fixture: ComponentFixture<ClassRoomJoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoomJoinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassRoomJoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
