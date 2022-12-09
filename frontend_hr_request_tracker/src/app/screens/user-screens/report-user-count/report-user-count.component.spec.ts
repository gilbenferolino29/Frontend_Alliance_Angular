import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUserCountComponent } from './report-user-count.component';

describe('ReportUserCountComponent', () => {
  let component: ReportUserCountComponent;
  let fixture: ComponentFixture<ReportUserCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportUserCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportUserCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
