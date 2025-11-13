import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PizzaModel } from '../../../models/pizza.model';
import { CarritoItemModel } from '../../../models/carrito.model';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card-pizza',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './card-pizza.html',
  styleUrl: './card-pizza.scss'
})
export class CardPizza implements OnInit {
  @Input() pizza!: PizzaModel;
  @Output() agregarAlCarro = new EventEmitter<CarritoItemModel>();

  // FormControl para la cantidad (Formulario Reactivo simple)
  cantidadControl = new FormControl(1, [Validators.required, Validators.min(1)]);

  ngOnInit(): void {} 

  onAgregar(): void {
    if (this.cantidadControl.invalid) return;

    const cantidad = this.cantidadControl.value!;

    // Crear el CarritoItemModel
    const nuevoItem = new CarritoItemModel(
      this.pizza.id,
      this.pizza.nombre,
      cantidad,
      this.pizza.precio,
      cantidad * this.pizza.precio
    );

    this.agregarAlCarro.emit(nuevoItem);
    this.cantidadControl.setValue(1); // Resetear a 1
  }
}