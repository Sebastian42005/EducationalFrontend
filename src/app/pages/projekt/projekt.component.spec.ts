import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektComponent } from './projekt.component';

describe('ProjektComponent', () => {
  let component: ProjektComponent;
  let fixture: ComponentFixture<ProjektComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjektComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjektComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
