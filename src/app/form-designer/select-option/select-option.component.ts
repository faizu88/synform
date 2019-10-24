import {Component, forwardRef, OnDestroy} from '@angular/core';
import {FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectOptionComponent)
    }
  ]
})
export class SelectOptionComponent implements OnDestroy {
  public selectOptionForm: FormGroup;
  public registerOnChangeFn;
  private destroy$ = new Subject();

  writeValue(v: any) {
    const objValue = v;
    this.selectOptionForm = new FormGroup({});
    this.selectOptionForm.addControl("selectOptions", new FormArray([]));
    let selectOptionArrRef = this.selectOptionForm.get('selectOptions') as FormArray;
    objValue['selectOptions'] = objValue['selectOptions'] || [];
    for (const obj of objValue['selectOptions']) {
      selectOptionArrRef.push(new FormGroup({
        label: new FormControl(obj.label),
        value: new FormControl(obj.value)
      }));
    }

    this.selectOptionForm.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
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
    this.registerOnChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
  }

  ngOnDestroy() {
    //Clearing the formFieldParameters with {}
    this.registerOnChangeFn({});
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
