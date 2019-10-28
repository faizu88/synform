import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormDesignerComponent} from "./form-designer.component";
import {SelectOptionComponent} from "./select-option/select-option.component";
import {ValidationComponent} from "./validation/validation.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('FormDesignerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDesignerComponent, SelectOptionComponent, ValidationComponent],
      imports: [RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FormDesignerComponent);
    const formDesignerComponent = fixture.debugElement.componentInstance;
    expect(formDesignerComponent).toBeTruthy();
  }));
});
