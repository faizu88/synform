import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormCreationComponent} from './form-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";

@NgModule({
  declarations: [FormCreationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        {name: 'required', message: 'This field is required'}
      ],
    }),
    FormlyBootstrapModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    FormCreationComponent
  ]
})
export class FormCreationModule {
}
