import { Component, Input } from '@angular/core';
import { CarritoItemModel } from '../../../models/carrito.model';
import { LineaPedido } from '../../molecula/linea-pedido/linea-pedido';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-resumen-pedido',
  imports: [CommonModule, LineaPedido, CurrencyPipe],
  templateUrl: './resumen-pedido.html',
  styleUrl: './resumen-pedido.scss',
})
export class ResumenPedido {
  @Input() items: CarritoItemModel[] = [];

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.precioTotal, 0);
  }
}
