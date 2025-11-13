import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineaPedido } from './linea-pedido';

describe('LineaPedido', () => {
  let component: LineaPedido;
  let fixture: ComponentFixture<LineaPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LineaPedido]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LineaPedido);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
