import {TestBed, async} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlySelectModule} from "@ngx-formly/core/select";
import {NgSelectModule} from "@ng-select/ng-select";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import {NgselectFormlyTypeComponent} from "./ngselect-formly-type/ngselect-formly-type.component";
import {FormCreationComponent} from "./form-creation.component";
import {FormlyModule} from "@ngx-formly/core";
import {SimpleChange} from "@angular/core";
describe('FormDesignerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormCreationComponent, NgselectFormlyTypeComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormlyBootstrapModule,
        NgSelectModule, FormlyModule.forRoot({
          types: [
            {name: 'ngselect', component: NgselectFormlyTypeComponent}
          ],
          validationMessages: [
            {name: 'required', message: 'This field is required'}
          ],
        }), FormlySelectModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(FormCreationComponent);
    const formCreationComponent = fixture.debugElement.componentInstance;
    expect(formCreationComponent).toBeTruthy();
  }));

  it('should update the formly controls', async(() => {
    const fixture = TestBed.createComponent(FormCreationComponent);
    const formCreationComponent = fixture.debugElement.componentInstance;
    const listObj = {
      "lists": [{
        "fieldName": "",
        "parameterName": "",
        "defaultValue": "",
        "validation": {},
        "required": false,
        "formField": "date",
        "formFieldParameters": {}
      }]
    };
    formCreationComponent.formlyFormControlsRef = listObj;
    formCreationComponent.ngOnChanges({
      name: new SimpleChange(null, formCreationComponent.formlyFormControlsRef, true)
    });
    fixture.detectChanges();
    expect(formCreationComponent.formlyFormFieldsArr.length).toBe(1);
    expect(formCreationComponent.formlyFormfields[0]["type"]).toBe("input");
  }));
});
