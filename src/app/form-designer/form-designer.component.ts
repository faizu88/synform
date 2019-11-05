import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-designer',
  templateUrl: './form-designer.component.html',
  styleUrls: ['./form-designer.component.scss']
})

export class FormDesignerComponent implements OnInit {
  public designerForm: FormGroup;
  public designerFormControls: object;
  public designerFormFieldTypes: { label: string, type: string }[] = [
    {label: "Input", type: "input"},
    {label: "Textarea", type: "textarea"},
    {label: "Number", type: "number"},
    {label: "Date", type: "date"},
    {label: "Checkbox", type: "checkbox"},
    {label: "Select", type: "select"},
    {label: "ngSelect", type: "ngselect"}
  ];
  @Output("designerFormOnSave") designerFormOnSaveRef: any = new EventEmitter();

  constructor(public fb: FormBuilder) {
  }

  designerFormInit() {
    this.designerForm = this.fb.group({
      lists: this.fb.array([
        this.fb.group({
          fieldName: new FormControl("", [Validators.required]),
          parameterName: new FormControl("", [Validators.required]),
          defaultValue: "",
          rowNumber: new FormControl(""),
          validation: new FormControl({}),
          required: false,
          formField: "input",
          formFieldParameters: new FormControl({})
        })
      ])
    });

    //this.patchFormValue();
  }

  patchFormValue() {
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
    let listArray = this.designerForm.get('lists') as FormArray
    listArray.controls = [];
    for (let i = 0; i < lists.length; i++) {
      let itemObj = {
        fieldName: lists[i]['fieldName'] || null,
        parameterName: lists[i]['parameterName'] || null,
        defaultValue: lists[i]['defaultValue'] || null,
        rowNumber: lists[i]['rowNumber'] || null,
        validation: lists[i]['validation'] || {},
        required: lists[i]['required'] || null,
        formField: lists[i]['formField'] || null,
        formFieldParameters: lists[i]['formFieldParameters'] || {},
      };
      listArray.push(this.fb.group({
        fieldName: new FormControl(itemObj.fieldName, [Validators.required]),
        parameterName: new FormControl(itemObj.parameterName, [Validators.required]),
        defaultValue: itemObj.defaultValue,
        validation: new FormControl(itemObj.validation),
        required: itemObj.required,
        formField: itemObj.formField,
        formFieldParameters: new FormControl(itemObj.formFieldParameters)
      }));
    }
  }

  designerFormAddList() {
    const lists = this.designerForm.get('lists') as FormArray;
    lists.push(
      this.fb.group({
        fieldName: new FormControl('', [Validators.required]),
        parameterName: new FormControl('', [Validators.required]),
        defaultValue: '',
        rowNumber: new FormControl(''),
        validation: new FormControl({validationPattern: []}),
        required: false,
        formField: 'input',
        formFieldParameters: new FormControl({})
      })
    );
  }

  designerFormRemoveList(index) {
    const globalParamForm = this.designerForm.get('lists') as FormArray;
    globalParamForm.removeAt(index);
  }

  designerFormFieldOnChange(list) {
    const activeFormField: string = list.get('formField').value;
    list.patchValue({defaultValue: ''});
  }

  designerFormOnSave() {
    this.designerFormControls = this.designerForm.getRawValue();
    this.designerFormOnSaveRef.emit(this.designerFormControls);
    console.log(this.designerFormControls)
  }

  ngOnInit() {
    this.designerFormInit();
  }
}
