import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { CarritoItemModel } from '../../../models/carrito.model';
import { LineaPedido } from '../../molecula/linea-pedido/linea-pedido';

@Component({
  selector: 'app-formulario-pago',
  imports: [CommonModule, ReactiveFormsModule, LineaPedido, CurrencyPipe],
  templateUrl: './formulario-pago.html',
  styleUrl: './formulario-pago.scss',
})
export class FormularioPago {
  @Input() items: CarritoItemModel[] = [];
  @Output() pagoRealizado = new EventEmitter<void>();
  @Output() limpiarPedido = new EventEmitter<void>();

  pagoForm!: FormGroup;

  constructor(private fb: FormBuilder, private currencyPipe: CurrencyPipe) {}

  ngOnInit(): void {
    // 1. Inicialización del formulario con validadores iniciales
    this.pagoForm = this.fb.group({
      horaEntrega: ['', [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)]], // Formato HH:MM
      direccion: ['', Validators.required],
      metodoPago: ['Tarjeta', Validators.required], // Valor por defecto
      numeroTarjeta: [''],
      numeroMovil: ['']
    });

    // 2. Lógica de Validación Condicional (la parte compleja del examen)
    this.pagoForm.get('metodoPago')?.valueChanges.subscribe(metodo => {
      const tarjetaControl = this.pagoForm.get('numeroTarjeta');
      const movilControl = this.pagoForm.get('numeroMovil');

      // Limpiar validadores de ambos campos antes de reestablecer
      tarjetaControl?.clearValidators();
      movilControl?.clearValidators();

      if (metodo === 'Tarjeta') {
          // Si elige Tarjeta: 16 dígitos requeridos
          tarjetaControl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]); 
      } else if (metodo === 'Bizum') {
          // Si elige Bizum: 9 dígitos requeridos
          movilControl?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]); 
      }

      // Re-evaluar la validez
      tarjetaControl?.updateValueAndValidity();
      movilControl?.updateValueAndValidity();
    });
  }
  
  // Getter para acceso fácil a los controles en el template
  get f(): { [key: string]: AbstractControl } {
    return this.pagoForm.controls;
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.precioTotal, 0);
  }

  onPagar(): void {
    if (this.pagoForm.invalid) {
      alert('Por favor, completa correctamente todos los campos de pago.');
      this.pagoForm.markAllAsTouched();
      return;
    }
    
    const totalFormateado = this.currencyPipe.transform(this.total, 'EUR', 'symbol', '1.2-2', 'es') || this.total;
    alert(`¡Pago exitoso! Gracias por tu pedido de ${totalFormateado}.`);
    this.pagoRealizado.emit();
  }

  onLimpiar(): void {
    // Al limpiar, se limpia la lista de pizzas y se vuelve el foco
    if (confirm('¿Estás seguro de que deseas limpiar el pedido?')) {
      this.limpiarPedido.emit();
    }
  }
  
}
