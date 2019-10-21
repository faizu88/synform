import {Component, OnInit, Output} from '@angular/core';
import {FormGroup, FormBuilder, FormArray, FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public formDesignerControls: object;

  formCreationInit(event) {
    console.log(event,"event");
    this.formDesignerControls = event;
  }
}

