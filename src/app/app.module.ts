import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormCreationModule} from "./form-creation/form-creation.module";
import {FormDesignerModule} from "./form-designer/form-designer.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormCreationModule,
    FormDesignerModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
