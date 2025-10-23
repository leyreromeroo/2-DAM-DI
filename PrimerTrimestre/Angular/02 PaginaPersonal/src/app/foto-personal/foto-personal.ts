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
  srcImage = input('default.jpg');
  clickFoto = output<string>();
  clickImagen() {
    this.clickFoto.emit('He pinchado en la foto: ' + this.title);
  }
}
