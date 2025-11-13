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
  imports: [
    CommonModule, 
    Header, 
    Footer, 
    ListaPizzas, 
    ResumenPedido, 
    FormularioPago,
    CurrencyPipe
  ],
  templateUrl: './pagina-principal.html',
  styleUrl: './pagina-principal.scss',
})
export class PaginaPrincipal {
// Configuración de la aplicación
  appConfig: ConfiguracionModel = new ConfiguracionModel(
    '4V PIZZA',
    'icono-pizza.png', // Placeholder (debe estar en assets)
    'Leyre Romero' 
  );
  
  // Estado de la aplicación (simula el routing)
  vista: 'pizzas' | 'pago' = 'pizzas';

  // Datos de las pizzas (Usaremos Data URIs o URLs simples)
  pizzas: PizzaModel[] = [
    // Nota: Las URLs son placeholders, deben ser reemplazadas por tus imágenes o Data URIs
    new PizzaModel('R1', 'Margarita', 15.50, 'pizza-margarita.jpg', ['fa-solid fa-tomato-slice', 'fa-solid fa-cheese', 'fa-solid fa-leaf']),
    new PizzaModel('R2', 'BBQ', 18.00, 'pizza-bbq2.jpg', ['fa-solid fa-bacon', 'fa-solid fa-cow', 'fa-solid fa-onion']),
    new PizzaModel('R3', 'Napolitana', 16.50, 'pizza-napolitana.jpg', ['fa-solid fa-fish', 'fa-solid fa-olive', 'fa-solid fa-pepper-hot']),
    new PizzaModel('R4', 'Vegetariana', 14.50, 'pizza-vegetariana.jpg', ['fa-solid fa-carrot', 'fa-solid fa-pepper-hot', 'fa-solid fa-broccoli']),
    new PizzaModel('R5', 'Hawaina', 17.50, 'pizza-hawaiana.jpg', ['fa-solid fa-pineapple', 'fa-solid fa-ham', 'fa-solid fa-cheese']),
    new PizzaModel('R6', 'Carbonara', 16.00, 'pizza-carbonara.jpg', ['fa-solid fa-egg', 'fa-solid fa-bacon', 'fa-solid fa-mushroom']),
  ];
  
  carrito: CarritoItemModel[] = [];

  get totalCarrito(): number {
    return this.carrito.reduce((sum, item) => sum + item.precioTotal, 0);
  }

  agregarACarrito(newItem: CarritoItemModel): void {
    const existingItem = this.carrito.find(item => item.idPizza === newItem.idPizza);

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
