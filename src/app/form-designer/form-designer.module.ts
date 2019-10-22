import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormDesignerComponent} from './form-designer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SelectOptionListComponent} from './select-option-list/select-option-list.component';
import {SelectOptionComponent} from './select-option/select-option.component';

@NgModule({
  declarations: [FormDesignerComponent, SelectOptionListComponent, SelectOptionComponent],
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
