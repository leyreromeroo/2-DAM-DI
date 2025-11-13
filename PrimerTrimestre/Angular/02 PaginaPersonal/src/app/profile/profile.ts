import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { FotoPersonal } from '../foto-personal/foto-personal';
import { FotoPerfilModel } from '../models/fotoPersonalModel';
import { UpperCasePipe } from '@angular/common';
import { FrmContactoModel } from '../models/frm-contactoModel';
import { FrmContacto } from '../frm-contacto/frm-contacto';

@Component({
  selector: 'app-profile',
  imports: [FotoPersonal, UpperCasePipe, FrmContacto],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  //listaContactos: FrmContactoModel[] = [];
  /*@Input() frmContacto!: FrmContactoModel;*/

  title = 'Mi página personal';
  imagenClickeada = '';

  esOculto = signal(false);
  titleBoton = signal('Ocultar');
  mostrarContactos = signal(false);

  titlePhoto = 'Yo contenta';
  photos: FotoPerfilModel[] = [];
  srcPhoto =
    'https://media.istockphoto.com/id/904711962/es/vector/mujer-joven-agitando-personaje-avatar-feliz.jpg?s=170667a&w=0&k=20&c=IXW4IiIRqS0BDnbq8XBMkKDsdDbkW8XAxpP5CkKlnfM=';

  ngOnInit() {
    const fotoContento = new FotoPerfilModel(
      'Estoy Contento',
      'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-173524.jpg?w=740',
      ''
    );
    const fotoTriste = new FotoPerfilModel(
      'Estoy Triste',
      'https://static.vecteezy.com/system/resources/previews/053/232/166/non_2x/sad-boy-cartoon-avatar-illustration-free-vector.jpg',
      ''
    );
    this.photos = [fotoContento, fotoTriste];
  }

  toggleName() {
    this.esOculto.set(!this.esOculto());
    this.titleBoton.set(this.esOculto() ? 'Mostrar' : 'Ocultar');
  }

  toggleContactos() {
    this.mostrarContactos.set(!this.mostrarContactos());
  }

  ensenarClick(event: string) {
    this.imagenClickeada = event;
  }

  /*agregarNuevoContacto(contacto: FrmContactoModel): void {
    this.listaContactos.push(contacto);
    alert(`Contacto "${contacto.email}" agregado exitosamente.`);
  }*/
}


