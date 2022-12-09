import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTrackerComponent } from './home-tracker.component';

describe('HomeTrackerComponent', () => {
  let component: HomeTrackerComponent;
  let fixture: ComponentFixture<HomeTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
