import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicRequestDialogComponent } from './topic-request-dialog.component';

describe('TopicRequestDialogComponent', () => {
  let component: TopicRequestDialogComponent;
  let fixture: ComponentFixture<TopicRequestDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicRequestDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
