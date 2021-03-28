import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllclubComponent } from './allclub.component';

describe('AllclubComponent', () => {
  let component: AllclubComponent;
  let fixture: ComponentFixture<AllclubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllclubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllclubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
