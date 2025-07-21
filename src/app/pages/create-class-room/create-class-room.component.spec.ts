import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClassRoomComponent } from './create-class-room.component';

describe('CreateClassRoomComponent', () => {
  let component: CreateClassRoomComponent;
  let fixture: ComponentFixture<CreateClassRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateClassRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateClassRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
