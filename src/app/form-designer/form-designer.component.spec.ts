import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormDesignerComponent} from "./form-designer.component";
import {SelectOptionComponent} from "./select-option/select-option.component";
import {ValidationComponent} from "./validation/validation.component";
import {FormArray, FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('FormDesignerComponent', () => {
  let formDesignerComponentRef: FormDesignerComponent;
  let fixture: ComponentFixture<FormDesignerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormDesignerComponent, SelectOptionComponent, ValidationComponent],
      providers: [
        FormBuilder
      ],
      imports: [RouterTestingModule, ReactiveFormsModule]
    }).compileComponents();
    fixture = TestBed.createComponent(FormDesignerComponent);
    formDesignerComponentRef = fixture.debugElement.componentInstance;
  }));

  it('should create "FormDesigner" component', async(() => {
    expect(formDesignerComponentRef).toBeTruthy();
  }));

  it('should invoke "designerFormInit()"', () => {
    /* const fixture = TestBed.createComponent(FormDesignerComponent);
     const formDesignerComponent = fixture.debugElement.componentInstance;*/
    jest.spyOn(formDesignerComponentRef, 'designerFormInit');
    formDesignerComponentRef.ngOnInit();
    expect(formDesignerComponentRef.designerFormInit).toHaveBeenCalledTimes(1);
  });

  it('should be a invalid designer form', () => {
    fixture.detectChanges();
    expect(formDesignerComponentRef.designerForm.valid).toBeFalsy();
  });

  it('patching designer form values', () => {
    fixture.detectChanges();
    let responseData = {
      "lists": [
        {
          "fieldName": "A",
          "parameterName": "A",
          "defaultValue": null,
          "validation": {},
          "required": null,
          "formField": "select",
          "formFieldParameters": {
            "selectOptions": [
              {
                "label": "Label A",
                "value": "A"
              },
              {
                "label": "Label B",
                "value": "B"
              }
            ]
          }
        },
        {
          "fieldName": "B",
          "parameterName": "B",
          "defaultValue": "This is textarea",
          "validation": {
            "validationPattern": [
              ""
            ]
          },
          "required": false,
          "formField": "textarea",
          "formFieldParameters": {}
        },
        {
          "fieldName": "C",
          "parameterName": "C",
          "defaultValue": 100,
          "validation": {
            "min": "1",
            "max": "200"
          },
          "required": false,
          "formField": "number",
          "formFieldParameters": {}
        }
      ]
    };
    let lists = responseData.lists;
    let listArray = formDesignerComponentRef.designerForm.get('lists') as FormArray
    listArray.controls = [];
    for (let i = 0; i < lists.length; i++) {
      let itemObj = {
        fieldName: lists[i]["fieldName"] || null,
        parameterName: lists[i]["parameterName"] || null,
        defaultValue: lists[i]["defaultValue"] || null,
        validation: lists[i]["validation"] || {},
        required: lists[i]["required"] || null,
        formField: lists[i]["formField"] || null,
        formFieldParameters: lists[i]["formFieldParameters"] || {},
      };
      listArray.push(formDesignerComponentRef.fb.group({
        fieldName: new FormControl(itemObj.fieldName, [Validators.required]),
        parameterName: new FormControl(itemObj.parameterName, [Validators.required]),
        defaultValue: itemObj.defaultValue,
        validation: new FormControl(itemObj.validation),
        required: itemObj.required,
        formField: itemObj.formField,
        formFieldParameters: new FormControl(itemObj.formFieldParameters)
      }));
    }
    const formCtrls = formDesignerComponentRef.designerForm.get('lists')["controls"];
    expect(formCtrls.length).toBe(3);
    expect(formCtrls[0].value.formField).toBe('select');
    expect(formCtrls[0].value.formFieldParameters).toHaveProperty('selectOptions');
    expect(formCtrls[1].value.formField).toBe('textarea');
    expect(formCtrls[1].value.validation).toHaveProperty('validationPattern');
    expect(formCtrls[2].value.formField).toBe('number');
    expect(formCtrls[2].value.validation).toMatchObject({'min': "1", 'max': "200"});
  });

  it('add designer form list', () => {
    fixture.detectChanges();
    const formCtrls = formDesignerComponentRef.designerForm.get('lists')["controls"];
    expect(formCtrls.length).toBe(1);
    formDesignerComponentRef.designerFormAddList();
    formDesignerComponentRef.designerFormAddList();
    expect(formCtrls.length).toBe(3);
  });

  it('remove designer form list', () => {
    fixture.detectChanges();
    const formCtrls = formDesignerComponentRef.designerForm.get('lists')["controls"];
    expect(formCtrls.length).toBe(1);
    formDesignerComponentRef.designerFormRemoveList(0);
    expect(formCtrls.length).toBe(0);
  });

  it('should reset the default value', () => {
    fixture.detectChanges();
    const formCtrls = formDesignerComponentRef.designerForm.get('lists')["controls"][0];
    formCtrls.patchValue({defaultValue: "default"});
    expect(formCtrls.get('defaultValue').value).toBe('default');
    formDesignerComponentRef.designerFormFieldOnChange(formCtrls);
    expect(formCtrls.get('defaultValue').value).toBe("");
  });

  it('should update the designerFormControls while saving', () => {
    fixture.detectChanges();
    const matchObjectRef = {
      "lists": [
        {
          "fieldName": "",
          "parameterName": "",
          "defaultValue": "",
          "validation": {},
          "required": false,
          "formField": "input",
          "formFieldParameters": {}
        }
      ]
    };
    formDesignerComponentRef.designerFormOnSave();
    expect(formDesignerComponentRef.designerFormControls).toMatchObject(matchObjectRef);
  });
});


