import {Component, forwardRef, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import set = Reflect.set;

@Component({
  selector: 'app-select-option-list',
  templateUrl: './select-option-list.component.html',
  styleUrls: ['./select-option-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => SelectOptionListComponent)
    }
  ]
})
export class SelectOptionListComponent implements OnDestroy {
  public selectOptionListform: FormGroup;
  public registerOnChangeFn;
  private destroy$ = new Subject();

  writeValue(v: any) {
    this.selectOptionListform = new FormGroup({});
    Object.keys(v).forEach(x => {
      this.selectOptionListform.addControl(x, new FormControl('', [Validators.required]));
    });
    this.selectOptionListform.setValue(v, {emitEvent: false});
    this.selectOptionListform.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (this.registerOnChangeFn) {
          this.registerOnChangeFn(this.selectOptionListform.value);
        }
      });
  }

  registerOnChange(fn: (v: any) => void) {
    this.registerOnChangeFn = fn;
  }

  registerOnTouched(fn: () => void) {
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
