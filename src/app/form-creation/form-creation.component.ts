import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormGroup} from "@angular/forms";


@Component({
  selector: 'app-form-creation',
  templateUrl: './form-creation.component.html',
  styleUrls: ['./form-creation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FormCreationComponent implements OnChanges {
  public formlyForm = new FormGroup({});
  public formlyModel = {};
  public formlyFormfields: FormlyFieldConfig[] = [];
  public formlyFormFieldsArr = [];
  @Input("formCreationControls") formlyFormControlsRef: any;

  renderFormCreation() {
    const formlyFormFieldsArr = this.formlyFormFieldsArr;
    if (formlyFormFieldsArr.length) {
      const lists = formlyFormFieldsArr
      const formlyfieldArr = [];
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
        formlyFieldObj["validators"] = {};

        let validationPatterObj = {};
        if (lists[i]["required"] === true) {
          let validationPatterArr = lists[i]["validation"]["validationPattern"] || [];
          for (let i = 0; i < validationPatterArr.length; i++) {
            let regex = RegExp(validationPatterArr[i]);
            validationPatterObj["v" + i] = {
              expression: (c) => !c.value || regex.test(c.value),
              message: (error, field: FormlyFieldConfig) => {
                return `${field.formControl.value} is not a valid ${formlyFieldType}.`
              }
            };
          }
        }

        switch (formlyFieldType) {
          case "input":
          case "textarea":
            formlyFieldObj["type"] = lists[i]["formField"];
            formlyFieldObj["validators"] = validationPatterObj;
            break;
          case "number":
            formlyFieldObj["type"] = "input";
            formlyFieldObj["templateOptions"]["type"] = lists[i]["formField"];
            formlyFieldObj["templateOptions"]["min"] = lists[i]["validation"]["min"];
            formlyFieldObj["templateOptions"]["max"] = lists[i]["validation"]["max"];
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
          case "ngselect":
            let ngSelectOptions = lists[i]["formFieldParameters"]["selectOptions"];
            formlyFieldObj["type"] = lists[i]["formField"];
            formlyFieldObj["templateOptions"]["options"] = ngSelectOptions;
            formlyFieldObj["templateOptions"]["valueProp"] = 'value';
            formlyFieldObj["templateOptions"]["labelProp"] = 'label';
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
