import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreTeachingUnitsComponent } from './explore-teaching-units.component';

describe('ExploreTeachingUnitsComponent', () => {
  let component: ExploreTeachingUnitsComponent;
  let fixture: ComponentFixture<ExploreTeachingUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExploreTeachingUnitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExploreTeachingUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
