import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTrackerComponent } from './delete-tracker.component';

describe('DeleteTrackerComponent', () => {
  let component: DeleteTrackerComponent;
  let fixture: ComponentFixture<DeleteTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteTrackerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
