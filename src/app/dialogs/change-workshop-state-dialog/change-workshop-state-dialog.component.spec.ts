import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeWorkshopStateDialogComponent } from './change-workshop-state-dialog.component';

describe('ChangeWorkshopStateDialogComponent', () => {
  let component: ChangeWorkshopStateDialogComponent;
  let fixture: ComponentFixture<ChangeWorkshopStateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeWorkshopStateDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeWorkshopStateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
