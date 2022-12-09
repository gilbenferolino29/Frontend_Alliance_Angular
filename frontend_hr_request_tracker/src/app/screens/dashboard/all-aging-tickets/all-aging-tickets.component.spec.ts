import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAgingTicketsComponent } from './all-aging-tickets.component';

describe('AllAgingTicketsComponent', () => {
  let component: AllAgingTicketsComponent;
  let fixture: ComponentFixture<AllAgingTicketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllAgingTicketsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllAgingTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
