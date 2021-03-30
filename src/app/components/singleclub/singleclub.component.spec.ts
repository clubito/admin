import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleclubComponent } from './singleclub.component';

describe('SingleclubComponent', () => {
  let component: SingleclubComponent;
  let fixture: ComponentFixture<SingleclubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleclubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
