import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormHintComponent } from './form-hint.component';

describe('FormHintComponent', () => {
  let component: FormHintComponent;
  let fixture: ComponentFixture<FormHintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormHintComponent]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(FormHintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
