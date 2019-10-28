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
import {By} from "@angular/platform-browser";

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

  it('should call "renderFormCreation" method', () => {
    const fixture = TestBed.createComponent(FormCreationComponent);
    const formCreationComponent = fixture.debugElement.componentInstance;
    formCreationComponent.renderFormCreation = jest.fn(); //1
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
    expect(formCreationComponent.renderFormCreation).toHaveBeenCalledTimes(1);
  });

  it('should update the formly controls [formlyFormfields]', async(() => {
    const fixture = TestBed.createComponent(FormCreationComponent);
    const formCreationComponent = fixture.debugElement.componentInstance;
    const listObj = {
      "lists": [
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {
            "validationPattern": [
              "[0-9]$"
            ]
          },
          "required": true,
          "formField": "input",
          "formFieldParameters": {}
        },
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {
            "min": "10",
            "max": "12"
          },
          "required": false,
          "formField": "number",
          "formFieldParameters": {}
        },
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {},
          "required": null,
          "formField": "date",
          "formFieldParameters": {}
        },
      ]
    };
    formCreationComponent.formlyFormControlsRef = listObj;
    formCreationComponent.ngOnChanges({
      name: new SimpleChange(null, formCreationComponent.formlyFormControlsRef, true)
    });
    fixture.detectChanges();
    expect(formCreationComponent.formlyFormfields[0]["type"]).toBe("input");
    expect((formCreationComponent.formlyFormfields[0]["validators"]['v0'])).toHaveProperty('expression');
    expect(formCreationComponent.formlyFormfields[1]["templateOptions"]["type"]).toBe("number");
    expect(formCreationComponent.formlyFormfields[1]["templateOptions"]["min"]).toBe("10");
    expect(formCreationComponent.formlyFormfields[1]["templateOptions"]["max"]).toBe("12");
  }));

  it('should submit the form', async(() => {
    const fixture = TestBed.createComponent(FormCreationComponent);
    const formCreationComponent = fixture.debugElement.componentInstance;
    formCreationComponent.formOnSubmit = jest.fn();
    const listObj = {
      "lists": [
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {
            "validationPattern": [
              "[0-9]$"
            ]
          },
          "required": true,
          "formField": "input",
          "formFieldParameters": {}
        },
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {
            "min": "10",
            "max": "12"
          },
          "required": false,
          "formField": "number",
          "formFieldParameters": {}
        }
      ]
    };
    formCreationComponent.formlyFormFieldsArr = listObj["lists"];
    fixture.detectChanges();
    let el = fixture.debugElement.query(By.css('form'));
    el.triggerEventHandler('ngSubmit', null);
    fixture.detectChanges();
    expect(formCreationComponent.formOnSubmit).toHaveBeenCalledTimes(1);
  }));

});
