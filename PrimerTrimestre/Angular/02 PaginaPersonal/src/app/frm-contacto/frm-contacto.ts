import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FrmContactoModel } from '../models/frm-contactoModel';

@Component({
  selector: 'app-frm-contacto',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './frm-contacto.html',
  styleUrls: ['./frm-contacto.scss'],
})
export class FrmContacto {
  contactForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    mensaje: new FormControl('', Validators.required),
  });

  @Output() frmContacto = new EventEmitter<FrmContactoModel>();

  get email() {
    return this.contactForm.get('email');
  }

  get mensaje() {
    return this.contactForm.get('mensaje');
  }

  sendMessage() {
    if (this.contactForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      this.contactForm.markAllAsTouched();
      return;
    }

    const formValues = this.contactForm.value;
    const nuevoContacto: FrmContactoModel = {
      email: formValues.email!,//Poner ! al final para permitir nulos
      mensaje: formValues.mensaje!,
    };

    this.frmContacto.emit(nuevoContacto); //El nombre del emitter (frmContacto) va en el padre en () porque es un Output de evento
    this.contactForm.reset();

    //alert(`Mensaje enviado correctamente por: ${nuevoContacto.email}`);
  }
}
