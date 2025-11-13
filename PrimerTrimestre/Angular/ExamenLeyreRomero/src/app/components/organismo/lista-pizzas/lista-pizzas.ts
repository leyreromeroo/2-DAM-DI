import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PizzaModel } from '../../../models/pizza.model';
import { CardPizza } from '../../molecula/card-pizza/card-pizza';
import { CarritoItemModel } from '../../../models/carrito.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-pizzas',
  imports: [CommonModule, CardPizza],
  templateUrl: './lista-pizzas.html',
  styleUrl: './lista-pizzas.scss',
})
export class ListaPizzas {
  @Input() pizzas: PizzaModel[] = [];
  @Output() pizzaAgregada = new EventEmitter<CarritoItemModel>();

  onAgregarAlCarro(item: CarritoItemModel): void {
    // Reemite el evento al componente de Página
    this.pizzaAgregada.emit(item);
  }
}
