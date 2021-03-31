import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubrequestComponent } from './clubrequest.component';

describe('ClubrequestComponent', () => {
  let component: ClubrequestComponent;
  let fixture: ComponentFixture<ClubrequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubrequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
