import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategoryCountComponent } from './report-category-count.component';

describe('ReportCategoryCountComponent', () => {
  let component: ReportCategoryCountComponent;
  let fixture: ComponentFixture<ReportCategoryCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCategoryCountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCategoryCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
