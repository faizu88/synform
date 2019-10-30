import {FormDesignerModule} from "../form-designer.module";


import {TestBed, async, ComponentFixture, fakeAsync, tick} from "@angular/core/testing";
import {DebugElement, Component} from "@angular/core";
import {By} from "@angular/platform-browser";
import {FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {SelectOptionComponent, NG_VALUE_ACCESSOR_} from "./select-option.component";
import {FormDesignerComponent} from "../form-designer.component";
import {ValidationComponent} from "../validation/validation.component";


@Component({
  selector: "select-option-test",
  template: `
    <form [formGroup]="testForm">
      <app-select-option formControlName="formFieldParameters"></app-select-option>
    </form>`
})
class SelectOptionTestClass {
  testForm: FormGroup;

  constructor() {
    this.testForm = new FormGroup({
      formFieldParameters: new FormControl({
        "selectOptions": [{"label": "Label A", "value": "A"}, {
          "label": "Label B",
          "value": "B"
        }]
      })
    });
  }
}

describe("SelectOptionComponent", () => {
  let selectOptionComponent: SelectOptionComponent;
  let selectOptionFixture;
  let testComponent: SelectOptionTestClass;
  let testFixture;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule],
      declarations: [FormDesignerComponent, SelectOptionComponent, ValidationComponent, SelectOptionTestClass],
      providers: [NG_VALUE_ACCESSOR_]
    }).compileComponents();
    selectOptionFixture = TestBed.createComponent(SelectOptionComponent);
    selectOptionComponent = selectOptionFixture.debugElement.componentInstance;
    testFixture = TestBed.createComponent(SelectOptionTestClass);
    testComponent = testFixture.debugElement.componentInstance;
  }));

  /*it("...", fakeAsync(() => {
   selectOptionFixture.detectChanges();
   testFixture.detectChanges();
   /!*
   selectOptionComponent.selectOptionForm.patchValue({
   formFieldParameters: {"selectOptions": [{label: "label1111", value: "value11111111"}]}
   });*!/
   console.log(selectOptionComponent.test, "<<<<<<<< selectOptionComponent.test <<< spec");
   /!*
   const selectOptionArrRef = selectOptionComponent.selectOptionForm.get('selectOptions') as FormArray;
   selectOptionArrRef.push(new FormGroup({label: new FormControl('111111'), value: new FormControl('22222222')}));
   selectOptionFixture.detectChanges();
   *!/
   }));*/

});
