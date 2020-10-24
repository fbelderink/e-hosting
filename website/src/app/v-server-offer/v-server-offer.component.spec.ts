import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VServerOfferComponent } from './v-server-offer.component';

describe('VServerOfferComponent', () => {
  let component: VServerOfferComponent;
  let fixture: ComponentFixture<VServerOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VServerOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VServerOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
