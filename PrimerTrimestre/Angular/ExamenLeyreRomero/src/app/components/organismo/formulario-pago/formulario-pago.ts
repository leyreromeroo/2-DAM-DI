import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { CarritoItemModel } from '../../../models/carrito.model'; // RUTA CORREGIDA
import { LineaPedido } from '../../molecula/linea-pedido/linea-pedido'; // CLASE CORREGIDA

@Component({
  selector: 'app-formulario-pago',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule, LineaPedido, CurrencyPipe],
  templateUrl: './formulario-pago.html',
  styleUrl: './formulario-pago.scss',
})

export class FormularioPago implements OnInit { 
  @Input() items: CarritoItemModel[] = [];
  @Output() pagoRealizado = new EventEmitter<void>();
  @Output() limpiarPedido = new EventEmitter<void>();

  pagoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // 1. Inicialización del formulario
    this.pagoForm = this.fb.group({
      horaEntrega: [
        '',
        [Validators.required, Validators.pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)],
      ],
      direccion: ['', Validators.required],
      metodoPago: ['Tarjeta', Validators.required],
      numeroTarjeta: [''],
      numeroMovil: [''],
    });

    this.pagoForm.get('metodoPago')?.valueChanges.subscribe((metodo) => {
      const tarjetaControl = this.pagoForm.get('numeroTarjeta');
      const movilControl = this.pagoForm.get('numeroMovil');

      tarjetaControl?.clearValidators();
      movilControl?.clearValidators();

      if (metodo === 'Tarjeta') {
        tarjetaControl?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      } else if (metodo === 'Bizum') {
        movilControl?.setValidators([Validators.required, Validators.pattern(/^\d{9}$/)]);
      }

      tarjetaControl?.updateValueAndValidity();
      movilControl?.updateValueAndValidity();
    });

    // CLAVE: Forzar la validación inicial del campo 'Tarjeta' al cargar
    this.pagoForm.get('metodoPago')?.updateValueAndValidity(); // Línea 86 (aprox)
    this.pagoForm.get('numeroTarjeta')?.updateValueAndValidity(); // Línea 87 (aprox)
  }
  
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
    
    const totalString = this.total.toFixed(2) + ' €';

    alert(`¡Pago exitoso! Gracias por tu pedido de ${totalString}.`);
    this.pagoRealizado.emit();
  }

  onLimpiar(): void {
    if (confirm('¿Estás seguro de que deseas limpiar el pedido?')) {
      this.limpiarPedido.emit();
    }
  }
}