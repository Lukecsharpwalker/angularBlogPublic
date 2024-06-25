import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompontent } from './login.component';

describe('LoginCompontent', () => {
  let component: LoginCompontent;
  let fixture: ComponentFixture<LoginCompontent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCompontent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginCompontent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
