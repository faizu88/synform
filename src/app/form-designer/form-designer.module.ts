import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormDesignerComponent} from './form-designer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectOptionComponent} from './select-option/select-option.component';
import {ValidationComponent} from './validation/validation.component';

@NgModule({
  declarations: [FormDesignerComponent, SelectOptionComponent, ValidationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormDesignerComponent
  ]
})
export class FormDesignerModule {
}
