import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeBlockModalComponentComponent } from './code-block-modal-component.component';

describe('CodeBlockModalComponentComponent', () => {
  let component: CodeBlockModalComponentComponent;
  let fixture: ComponentFixture<CodeBlockModalComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBlockModalComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeBlockModalComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
