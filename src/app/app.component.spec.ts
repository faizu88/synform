import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {RouterTestingModule} from '@angular/router/testing';
import {FormCreationModule} from "./form-creation/form-creation.module";
import {FormDesignerModule} from "./form-designer/form-designer.module";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, FormCreationModule, FormDesignerModule]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const appComponent = fixture.debugElement.componentInstance;
    expect(appComponent).toBeTruthy();
  }));

  it('should have the "app-form-designer" component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    const elementRef = compiled.querySelector('app-form-designer');
    expect(elementRef.nodeName.toLowerCase()).toContain("app-form-designer");
  }));

  it('should have the "app-form-creation" component', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.debugElement.nativeElement;
    const elementRef = compiled.querySelector('app-form-creation');
    expect(elementRef.nodeName.toLowerCase()).toContain("app-form-creation");
  }));
});
