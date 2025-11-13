import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPizza } from './card-pizza';

describe('CardPizza', () => {
  let component: CardPizza;
  let fixture: ComponentFixture<CardPizza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPizza]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPizza);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
