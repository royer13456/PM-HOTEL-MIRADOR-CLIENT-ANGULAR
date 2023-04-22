import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomformComponent } from './roomform.component';

describe('RoomformComponent', () => {
  let component: RoomformComponent;
  let fixture: ComponentFixture<RoomformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RoomformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
