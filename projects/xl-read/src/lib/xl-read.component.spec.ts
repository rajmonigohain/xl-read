import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XlReadComponent } from './xl-read.component';

describe('XlReadComponent', () => {
  let component: XlReadComponent;
  let fixture: ComponentFixture<XlReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XlReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XlReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
