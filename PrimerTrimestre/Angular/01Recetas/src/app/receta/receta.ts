import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { RecetaModel } from '../models/recetaModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta',
  imports: [CommonModule],
  templateUrl: './receta.html',
  styleUrl: './receta.scss'
})
export class Receta {
  
  //title = input.required<string>();
  //srcImage = input('default.jpg');//El input se bindea con {{ }} en el html ya que es texto
  //ingredientes = input<string>();//El input se bindea con {{ }} en el html ya que es texto
  @Input() recetaModel!: RecetaModel;//Recibo la receta del componente padre

  @Output() clickEliminarReceta: EventEmitter<string> = new EventEmitter<string>();//Creación de eventos entre componentes


  onEliminarReceta() {
    //Aquí hago la función de eliminar la receta
    this.clickEliminarReceta.emit(this.recetaModel.id);//Emito el evento con el mensaje
    //El componente padre (profile) escuchará este evento y mostrará el mensaje en consola
    //Bindeo el putput en el componente padre en () ya que es un evento
  }
}
