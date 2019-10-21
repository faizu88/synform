import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormDesignerComponent} from './form-designer.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [FormDesignerComponent],
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
