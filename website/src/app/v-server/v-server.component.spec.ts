import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VServerComponent } from './v-server.component';

describe('VServerComponent', () => {
  let component: VServerComponent;
  let fixture: ComponentFixture<VServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
