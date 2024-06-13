import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginCompontentComponent } from './login-compontent.component';

describe('LoginCompontentComponent', () => {
  let component: LoginCompontentComponent;
  let fixture: ComponentFixture<LoginCompontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginCompontentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginCompontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
