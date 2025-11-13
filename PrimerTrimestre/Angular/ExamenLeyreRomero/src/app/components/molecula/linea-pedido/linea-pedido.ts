import { Component, Input } from '@angular/core';
import { CarritoItemModel } from '../../../models/carrito.model';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-linea-pedido',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './linea-pedido.html',
  styleUrl: './linea-pedido.scss',
})
export class LineaPedido {
@Input() item!: CarritoItemModel;
}
