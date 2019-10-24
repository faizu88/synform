import {Component, forwardRef, Input, OnChanges, OnDestroy} from '@angular/core';
import {ControlContainer, FormArray, FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Subject} from "rxjs/index";
import {takeUntil} from "rxjs/internal/operators";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => ValidationComponent)
    }
  ]
})
export class ValidationComponent implements OnDestroy, OnChanges {
  public validationform: FormGroup;
  public registerOnChangeFn;
  private destroy$ = new Subject();

  @Input("formField") formFieldRef;

  writeValue(v: any) {
    this.validationform = new FormGroup({});
    let value = v;
    switch (this.formFieldRef) {
      case "number":
        value['min'] = value['min'] || '';
        value['max'] = value['max'] || '';
        this.validationform.addControl("min", new FormControl(value.min));
        this.validationform.addControl("max", new FormControl(value.max));
        this.validationform.removeControl("validationPattern");
        break;
      default:
        value['validationPattern'] = value['validationPattern'] || [];
        this.validationform.addControl("validationPattern", new FormArray([]));
        for (const obj of value['validationPattern']) {
          let validationPatternArrRef = this.validationform.get('validationPattern') as FormArray;
          validationPatternArrRef.push(new FormControl(obj));
        }
        this.validationform.removeControl("min");
        this.validationform.removeControl("max");
    }
    this.validationform.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (this.registerOnChangeFn) {
          this.registerOnChangeFn(this.validationform.value);
        }
      });
  }

  addValidationPattern() {
    let validationPatternArrRef = this.validationform.get('validationPattern') as FormArray;
    validationPatternArrRef.push(new FormControl(""));
  }

  removeValidationPattern(index) {
    let validationPatternArrRef = this.validationform.get('validationPattern') as FormArray;
    validationPatternArrRef.removeAt(index);
  }

  registerOnChange(fn: (v: any) => void) {
    this.registerOnChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
  }

  formAddRemoveControls() {
    if (!this.validationform) {
      return
    }
    switch (this.formFieldRef) {
      case "number":
        this.validationform.addControl("min", new FormControl());
        this.validationform.addControl("max", new FormControl());
        this.validationform.removeControl("validationPattern");
        break;
      default:
        this.validationform.addControl("validationPattern", new FormArray([]));
        this.validationform.removeControl("min");
        this.validationform.removeControl("max");
    }
  }


  ngOnDestroy() {
    this.registerOnChangeFn({});
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  ngOnChanges() {
    this.formAddRemoveControls();
  }
}
