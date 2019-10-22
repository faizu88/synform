import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public formDesignerControls: object;

  formCreationInit(event) {
    this.formDesignerControls = event;
  }
}

