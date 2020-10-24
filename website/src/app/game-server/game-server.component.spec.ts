import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameServerComponent } from './game-server.component';

describe('GameServerComponent', () => {
  let component: GameServerComponent;
  let fixture: ComponentFixture<GameServerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameServerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
