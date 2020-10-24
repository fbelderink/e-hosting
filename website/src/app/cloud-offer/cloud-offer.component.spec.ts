import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudOfferComponent } from './cloud-offer.component';

describe('CloudOfferComponent', () => {
  let component: CloudOfferComponent;
  let fixture: ComponentFixture<CloudOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloudOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloudOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
