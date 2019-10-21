import {ChangeDetectionStrategy, Component, Input, SimpleChanges} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreationComponent {
  public formlyForm = new FormGroup({});
  public formlyModel = {};
  public formlyFormfields: FormlyFieldConfig[] = [];
  public formlyFormFieldsArr = [];
  /*public formlySelectOptions = [
    {label: 'Option A', value: 'a'},
    {label: 'Option B', value: 'b'},
    {label: 'Option C', value: 'c'},
    {label: 'Option D', value: 'd'},
    {label: 'Option E', value: 'e'},
  ];*/

  @Input("formCreationControls") formlyFormControlsRef: any;

  renderFormCreation() {
    let formlyFormFieldsArr = this.formlyFormFieldsArr;
    if (formlyFormFieldsArr.length) {
      let lists = formlyFormFieldsArr
      let formlyfieldArr = [];
      //Clearing Formly Models + Formly From Controls
      this.formlyModel = {};
      this.formlyForm = new FormGroup({});
      for (let i = 0; i < lists.length; i++) {
        let formlyFieldObj = {};
        let formlyFieldType = lists[i]["formField"];
        formlyFieldObj["key"] = lists[i]["fieldName"] || ("fieldName" + i);
        formlyFieldObj["defaultValue"] = lists[i]["defaultValue"];
        formlyFieldObj["templateOptions"] = {};
        formlyFieldObj["templateOptions"]["label"] = lists[i]["fieldName"];
        formlyFieldObj["templateOptions"]["required"] = lists[i]["required"];
        switch (formlyFieldType) {
          case "input":
          case "textarea":
            formlyFieldObj["type"] = lists[i]["formField"];
            break;
          case "number":
            formlyFieldObj["type"] = "input";
            formlyFieldObj["templateOptions"]["type"] = lists[i]["formField"];
            break;
          case "date":
            formlyFieldObj["type"] = "input";
            formlyFieldObj["templateOptions"]["type"] = lists[i]["formField"];
            break;
          case "checkbox":
            formlyFieldObj["type"] = lists[i]["formField"];
            formlyFieldObj["defaultValue"] = Boolean(lists[i]["defaultValue"]);
            break;
          case "select":
            let selectOptions = lists[i]["formFieldParameters"]["selectOptions"];
            formlyFieldObj["type"] = lists[i]["formField"];
            formlyFieldObj["templateOptions"]["options"] = selectOptions;
            formlyFieldObj["defaultValue"] = selectOptions.length ? selectOptions[0]["value"] : '';
            break;
        }
        formlyfieldArr.push(formlyFieldObj);
      }
      this.formlyFormfields = formlyfieldArr;
    }
  }

  formOnSubmit() {
    console.log(this.formlyForm.getRawValue());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formlyFormControlsRef) {
      let formControlsObj = this.formlyFormControlsRef;
      for (let objKey in formControlsObj) {
        this.formlyFormFieldsArr = this.formlyFormControlsRef[objKey];
        this.renderFormCreation();
      }
    }
  }
}
