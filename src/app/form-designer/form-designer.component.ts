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
  public designerFormFieldTypes = [
    {label: "Input", type: "input"},
    {label: "Textarea", type: "textarea"},
    {label: "Number", type: "number"},
    {label: "Date", type: "date"},
    {label: "Checkbox", type: "checkbox"},
    {label: "Select", type: "select"},
    {label: "ngSelect", type: "ngselect"}

  ];
  @Output("designerFormOnSave") designerFormOnSaveRef: any = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  designerFormInit() {
    this.designerForm = this.fb.group({
      lists: this.fb.array([
        this.fb.group({
          fieldName:  new FormControl("", [Validators.required]),
          parameterName: new FormControl("", [Validators.required]),
          defaultValue: "A",
          required: false,
          formField: "select",
          formFieldParameters: this.fb.group({
            selectOptions: new FormControl([])
          })
        })
      ])
    });
  }

  addSelectFieldOption(formRef) {
    const selectOptionItem = formRef.get("formFieldParameters").get("selectOptions") as FormArray;
    selectOptionItem.push(this.fb.group({label: '', value: ''}));
  }

  removeSelectFeildOption(formRef, index) {
    let selectOptionItem = formRef
      .get("formFieldParameters")
      .get("selectOptions") as FormArray;
    selectOptionItem.removeAt(index);
  }

  designerFormAddList() {
    const lists = this.designerForm.get("lists") as FormArray;
    lists.push(
      this.fb.group({
        fieldName: new FormControl("", [Validators.required]),
        parameterName:new FormControl("", [Validators.required]),
        defaultValue: "",
        required: false,
        formField: "textarea",
        formFieldParameters: this.fb.group({
          selectOptions: new FormControl([])
        })
      })
    );
  }

  designerFormRemoveList(index) {
    let globalParamForm = this.designerForm.get("lists") as FormArray;
    globalParamForm.removeAt(index);
  }

  designerFormFieldOnChange(list) {
    list.patchValue({ defaultValue: "" });
    list.get("formFieldParameters").patchValue({"selectOptions":[]});
  }

  designerFormOnSave() {
    //<app-form-creation @Input> - Property Binding
    this.designerFormControls = this.designerForm.getRawValue();
    this.designerFormOnSaveRef.emit(this.designerFormControls);
  }

  ngOnInit() {
    this.designerFormInit();
  }
}
