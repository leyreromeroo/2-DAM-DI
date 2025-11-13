import { Component, signal, WritableSignal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FrmContactoModel } from '../models/frm-contactoModel';
import { FrmContacto } from '../frm-contacto/frm-contacto';

@Component({
  selector: 'app-lst-contactos',
  standalone: true,
  imports: [CommonModule, FrmContacto],
  templateUrl: './lst-contactos.html',
  styleUrl: './lst-contactos.scss'
})
export class LstContactos implements OnInit {
  
  // ✅ Propiedad para controlar la visibilidad (Signal)
  public mostrarContactos = signal<boolean>(true);

  // ✅ Lista de contactos (Signal). Se inicializa en ngOnInit.
  public listaContactos!: WritableSignal<FrmContactoModel[]>;

  ngOnInit(): void {
    // Inicialización de la Signal.
    this.listaContactos = signal(this.cargarContactosIniciales());
  }

  /**
   * ✅ Función para alternar la visibilidad de la lista de contactos.
   * Actualiza la Signal 'mostrarContactos' invirtiendo su valor actual.
   */
  public toggleMostrarContactos(): void {
    this.mostrarContactos.update(currentValue => !currentValue);
  }

  /**
   * Simula la carga de datos iniciales.
   * @returns Un array de contactos.
   */
  private cargarContactosIniciales(): FrmContactoModel[] {
    // Aquí pondrías la lógica para cargar datos del backend o mockearlos
    return [
      { email: 'inicial_ngOnInit@ejemplo.com', mensaje: 'Cargado en ngOnInit' },
      { email: 'data_cargada@dominio.net', mensaje: 'Datos precargados' },
      { email: 'test_ts@app.com', mensaje: 'Mensaje de prueba' }
    ];
  }
  
  public agregarNuevoContacto(contacto: FrmContactoModel): void {
    // Actualizamos la Signal de forma inmutable:
    this.listaContactos.update(contactosActuales => [...contactosActuales, contacto]);
 
    // Se mantiene el alert, pero se recomienda usar un modal o snackbar
    alert(`Contacto "${contacto.email}" agregado exitosamente.`);
  }

}
