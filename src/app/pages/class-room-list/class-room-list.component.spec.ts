import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassRoomListComponent } from './class-room-list.component';

describe('ClassRoomListComponent', () => {
  let component: ClassRoomListComponent;
  let fixture: ComponentFixture<ClassRoomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClassRoomListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClassRoomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
