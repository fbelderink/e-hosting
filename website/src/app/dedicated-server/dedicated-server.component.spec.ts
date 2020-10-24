import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DedicatedServerComponent } from './dedicated-server.component';

describe('DedicatedServerComponent', () => {
  let component: DedicatedServerComponent;
  let fixture: ComponentFixture<DedicatedServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DedicatedServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DedicatedServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
