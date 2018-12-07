import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PingerComponent } from './pinger.component';

describe('PingerComponent', () => {
  let component: PingerComponent;
  let fixture: ComponentFixture<PingerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PingerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PingerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
