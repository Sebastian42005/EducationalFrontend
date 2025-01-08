import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopChatComponent } from './workshop-chat.component';

describe('WorkshopChatComponent', () => {
  let component: WorkshopChatComponent;
  let fixture: ComponentFixture<WorkshopChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkshopChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkshopChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
