import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormDesignerComponent} from "./form-designer.component";
import {SelectOptionComponent} from "./select-option/select-option.component";
import {ValidationComponent} from "./validation/validation.component";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {detectChanges} from "@angular/core/src/render3";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('FormDesignerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDesignerComponent, SelectOptionComponent, ValidationComponent],
      providers: [
        FormBuilder
      ],
      imports: [RouterTestingModule, ReactiveFormsModule],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FormDesignerComponent);
    const formDesignerComponent = fixture.debugElement.componentInstance;
    expect(formDesignerComponent).toBeTruthy();
  }));



  it('should render with form', () => {
    const fixture = TestBed.createComponent(FormDesignerComponent);
    const formDesignerComponent = fixture.debugElement.componentInstance;
    formDesignerComponent.designerFormInit= jest.fn();
    formDesignerComponent.ngOnInit();
    fixture.detectChanges();
   // expect(formDesignerComponent.designerFormInit).toHaveBeenCalledTimes(1);
  });


});


