import { Component } from '@angular/core';
import { input } from '@angular/core';
import { output } from '@angular/core';

@Component({
  selector: 'app-foto-personal',
  imports: [],
  templateUrl: './foto-personal.html',
  styleUrl: './foto-personal.scss',
})
export class FotoPersonal {
  title = input.required<string>();
  srcImage = input('default.jpg');//El input se bindea con {{ }} en el html ya que es texto
  clickFoto = output<string>();//Creación de eventos entre componentes

  clickImagen() {
    this.clickFoto.emit('He pinchado en la foto: ' + this.title);//Emito el evento con el mensaje
    //El componente padre (profile) escuchará este evento y mostrará el mensaje en consola
    //Bindeo el putput en el componente padre en () ya que es un evento
  }
}
