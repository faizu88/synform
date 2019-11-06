import {Component, forwardRef, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject} from "rxjs";

export const NG_VALUE_ACCESSOR_: any = {
  provide: NG_VALUE_ACCESSOR,
  multi: true,
  useExisting: forwardRef(() => SelectOptionComponent)
}


@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  providers: [NG_VALUE_ACCESSOR_]
})
export class SelectOptionComponent implements OnDestroy, OnInit {
  public selectOptionForm: FormGroup;
  public registerOnChangeFn=function({}){};
  private destroy$ = new Subject();

  writeValue(v: any) {
    const objValue = v;
    /*this.selectOptionForm = new FormGroup({});
     this.selectOptionForm.addControl("selectOptions", new FormArray([]));*/
    let selectOptionArrRef = this.selectOptionForm.get('selectOptions') as FormArray;
    objValue['selectOptions'] = objValue['selectOptions'] || [];
    for (const obj of objValue['selectOptions']) {
      selectOptionArrRef.push(new FormGroup({
        label: new FormControl(obj.label),
        value: new FormControl(obj.value)
      }));
    }
    this.selectOptionForm.valueChanges.subscribe(res => {
      if (this.registerOnChangeFn) {
        this.registerOnChangeFn(this.selectOptionForm.value);
      }
    });
  }

  addSelectFieldOption() {
    const selectOptionArrRef = this.selectOptionForm.get('selectOptions') as FormArray;
    selectOptionArrRef.push(new FormGroup({label: new FormControl(''), value: new FormControl('')}));
  }

  removeSelectFieldOption(index) {
    const selectOptionArrRef = this.selectOptionForm.get('selectOptions') as FormArray;
    selectOptionArrRef.removeAt(index);
  }

  registerOnChange(fn: any): void {
    //console.log("hi");
    this.registerOnChangeFn = fn;
    
  }

  registerOnTouched(fn: () => void) {
  }

  ngOnDestroy() {
    console.log("hi");
    this.registerOnChangeFn({});
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnInit() {
    this.selectOptionForm = new FormGroup({});
    this.selectOptionForm.addControl("selectOptions", new FormArray([]));
    
  }
}
