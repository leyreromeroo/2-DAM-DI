import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';
import { RecetaModel } from '../../../models/recetaModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-receta',
  imports: [CommonModule],
  templateUrl: './receta.html',
  styleUrl: './receta.scss'
})
export class Receta {
  
  @Input() recetaModel!: RecetaModel;

  @Output() clickEliminarReceta: EventEmitter<string> = new EventEmitter<string>();

  onEliminarReceta() {
    this.clickEliminarReceta.emit(this.recetaModel.id);
  }
}
