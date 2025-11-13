import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

//Models
import { PizzaModel } from '../../../models/pizza.model';
import { CarritoItemModel } from '../../../models/carrito.model';
import { ConfiguracionModel } from '../../../models/configuracion.model';

// Organismos
import { Header } from '../../organismo/header/header';
import { Footer } from '../../organismo/footer/footer';
import { ListaPizzas } from '../../organismo/lista-pizzas/lista-pizzas';
import { ResumenPedido } from '../../organismo/resumen-pedido/resumen-pedido';
import { FormularioPago } from '../../organismo/formulario-pago/formulario-pago';

@Component({
  selector: 'app-pagina-principal',
  imports: [CommonModule, Header, Footer, ListaPizzas, ResumenPedido, FormularioPago, CurrencyPipe],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.scss',
})
export class PaginaPrincipal {
  // Configuración de la aplicación
  appConfig: ConfiguracionModel = new ConfiguracionModel(
    '4V PIZZA',
    'icono-pizza.png',
    'Leyre Romero'
  );

  // Estado de la aplicación (simula el routing)
  vista: 'pizzas' | 'pago' = 'pizzas';

  // Define este mapa en tu componente PaginaPrincipal (o en un archivo de configuración TS)
  INGREDIENT_ICON_MAP: { [key: string]: string } = {
    // Ingredientes Base
    Tomate: 'fa-solid fa-tomato', // Icono de Tomate/Salsa
    Queso: 'fa-solid fa-cheese', // Icono de Queso

    // Ingredientes Específicos
    Hoja: 'fa-solid fa-leaf', // Para albahaca/vegetal
    Carne: 'fa-solid fa-cow', // Para carne de vaca (BBQ)
    Cebolla: 'fa-solid fa-onion', // Icono de Cebolla
    Pescado: 'fa-solid fa-fish', // Icono de Pescado (Napolitana)
    Pimiento: 'fa-solid fa-pepper-hot', // Icono de Pimiento/Picante
    Champiñon: 'fa-solid fa-mushroom', // Icono de Champiñón
    Piña: 'fa-solid fa-pineapple', // Icono de Piña
    Huevo: 'fa-solid fa-egg', // Icono de Huevo (Carbonara)
    Crema: 'fa-solid fa-bowl-food', // Icono de Crema/Nata/Salsa

    // Añade más según tus necesidades
  };

  // En tu componente PaginaPrincipal

  // ... (INGREDIENT_ICON_MAP definido previamente) ...

  pizzas: PizzaModel[] = [
    new PizzaModel(
      'R1',
      'Margarita',
      15.5,
      'pizza-margarita.jpg',
      ['Tomate', 'Queso', 'Hoja'],
      this.INGREDIENT_ICON_MAP
    ),
    new PizzaModel(
      'R2',
      'BBQ',
      18.0,
      'pizza-bbq2.jpg',
      ['Tomate', 'Queso', 'Carne', 'Cebolla'],
      this.INGREDIENT_ICON_MAP
    ),
    new PizzaModel(
      'R3',
      'Napolitana',
      16.5,
      'pizza-napolitana.jpg',
      ['Tomate', 'Queso', 'Pescado'],
      this.INGREDIENT_ICON_MAP
    ),
    new PizzaModel(
      'R4',
      'Vegetariana',
      14.5,
      'pizza-vegetariana.jpg',
      ['Tomate', 'Queso', 'Pimiento', 'Champiñon'],
      this.INGREDIENT_ICON_MAP
    ),
    new PizzaModel(
      'R5',
      'Hawaina',
      17.5,
      'pizza-hawaiana.jpg',
      ['Tomate', 'Queso', 'Piña'],
      this.INGREDIENT_ICON_MAP
    ),
    new PizzaModel(
      'R6',
      'Carbonara',
      16.0,
      'pizza-carbonara.jpg',
      ['Tomate', 'Queso', 'Huevo', 'Crema'],
      this.INGREDIENT_ICON_MAP
    ),
  ];

  carrito: CarritoItemModel[] = [];

  get totalCarrito(): number {
    return this.carrito.reduce((sum, item) => sum + item.precioTotal, 0);
  }

  agregarACarrito(newItem: CarritoItemModel): void {
    const existingItem = this.carrito.find((item) => item.idPizza === newItem.idPizza);

    if (existingItem) {
      existingItem.cantidad += newItem.cantidad;
      existingItem.precioTotal = existingItem.subtotal;
    } else {
      this.carrito.push(newItem);
    }
  }

  finalizarPedido(): void {
    // Al realizar el pago, limpiamos el pedido y damos las gracias (la alerta está en el FormularioPago)
    this.limpiarCarrito();
  }

  limpiarCarrito(): void {
    // Limpiamos la lista de pizzas y volvemos a la vista inicial
    this.carrito = [];
    this.vista = 'pizzas';
  }
}
