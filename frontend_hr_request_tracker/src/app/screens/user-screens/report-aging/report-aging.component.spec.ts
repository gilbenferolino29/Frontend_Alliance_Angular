import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportAgingComponent } from './report-aging.component';

describe('ReportAgingComponent', () => {
  let component: ReportAgingComponent;
  let fixture: ComponentFixture<ReportAgingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportAgingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportAgingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
