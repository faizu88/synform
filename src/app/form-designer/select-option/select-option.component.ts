import {Component, forwardRef, OnDestroy} from '@angular/core';
import {FormArray, FormControl, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
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
  public selectOptionForm: FormArray;
  public registerOnChangeFn;
  private destroy$ = new Subject();

  writeValue(v: any) {
    this.selectOptionForm = new FormArray([]);
    const arrayValue = v;
    for (const obj of arrayValue) {
      this.selectOptionForm.push(new FormControl(obj));
    }
    this.selectOptionForm.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (this.registerOnChangeFn) {
          this.registerOnChangeFn(this.selectOptionForm.value);
        }
      });
  }

  addSelectFieldOption() {
    this.selectOptionForm.push(new FormControl({label: "", value: ""}));
  }

  removeSelectFieldOption(index) {
    const selectOptionItem = this.selectOptionForm as FormArray;
    selectOptionItem.removeAt(index);
  }

  registerOnChange(fn: any): void {
    this.registerOnChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
