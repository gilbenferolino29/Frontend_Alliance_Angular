import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTrackerComponent } from './update-tracker.component';

describe('UpdateTrackerComponent', () => {
  let component: UpdateTrackerComponent;
  let fixture: ComponentFixture<UpdateTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
