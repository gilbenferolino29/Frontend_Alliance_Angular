import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRoleComponent } from './home-role.component';

describe('HomeRoleComponent', () => {
  let component: HomeRoleComponent;
  let fixture: ComponentFixture<HomeRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeRoleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
