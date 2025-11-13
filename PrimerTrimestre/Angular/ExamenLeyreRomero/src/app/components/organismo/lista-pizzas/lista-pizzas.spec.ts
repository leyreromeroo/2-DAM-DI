import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPizzas } from './lista-pizzas';

describe('ListaPizzas', () => {
  let component: ListaPizzas;
  let fixture: ComponentFixture<ListaPizzas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPizzas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPizzas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
