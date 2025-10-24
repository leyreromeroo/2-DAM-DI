import { Component } from '@angular/core';
import { RecetasModel } from '../models/recetasModel';

@Component({
  selector: 'app-recetas',
  imports: [],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss'
})
export class Recetas {
  idImagen = 'Yo contenta';
  photos: RecetasModel[] = [];
  srcPhoto = '';



}
