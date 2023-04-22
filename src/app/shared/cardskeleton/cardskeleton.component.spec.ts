import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardskeletonComponent } from './cardskeleton.component';

describe('CardskeletonComponent', () => {
  let component: CardskeletonComponent;
  let fixture: ComponentFixture<CardskeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CardskeletonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardskeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
