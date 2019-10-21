import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgselectFormlyTypeComponent } from './ngselect-formly-type.component';

describe('NgselectFormlyTypeComponent', () => {
  let component: NgselectFormlyTypeComponent;
  let fixture: ComponentFixture<NgselectFormlyTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgselectFormlyTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgselectFormlyTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
