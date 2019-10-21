import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormCreationComponent} from './form-creation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from "@ngx-formly/core";
import {FormlyBootstrapModule} from "@ngx-formly/bootstrap";
import { NgSelectModule } from '@ng-select/ng-select';
import { FormlySelectModule } from '@ngx-formly/core/select';
import { NgselectFormlyTypeComponent } from './ngselect-formly-type/ngselect-formly-type.component';


@NgModule({
  declarations: [FormCreationComponent, NgselectFormlyTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        { name: 'ngselect', component: NgselectFormlyTypeComponent}
      ],
      validationMessages: [
        {name: 'required', message: 'This field is required'}
      ],
    }),
    FormlyBootstrapModule,
    NgSelectModule,
    FormlySelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
    FormCreationComponent,
    NgselectFormlyTypeComponent,
    NgSelectModule,
    FormlySelectModule
  ]
})
export class FormCreationModule {
}
