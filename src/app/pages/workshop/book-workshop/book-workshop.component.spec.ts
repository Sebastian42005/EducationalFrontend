import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookWorkshopComponent } from './book-workshop.component';

describe('BookWorkshopComponent', () => {
  let component: BookWorkshopComponent;
  let fixture: ComponentFixture<BookWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookWorkshopComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
