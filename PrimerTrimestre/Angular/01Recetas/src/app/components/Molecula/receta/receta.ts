import { Component, Input, input} from '@angular/core';
import { RecetaModel } from '../../../models/recetaModel';
import { CommonModule } from '@angular/common';
import { ServicioRecetas } from '../../../services/servicio-recetas';


@Component({
  selector: 'app-receta',
  imports: [CommonModule],
  templateUrl: './receta.html',
  styleUrl: './receta.scss'
})
export class Receta {
  
  public readonly Math = Math;
  constructor(private recetasService: ServicioRecetas) {}

  //@Input() recetaModel!: RecetaModel;
  recetaModel = input.required<RecetaModel>();

  onEliminar() {
    //Al utilizar la forma más nueva de Input, se vuelve recetaModel() en una función y se accede a ella con ()
    this.recetasService.borrarReceta(this.recetaModel().id);
  }

  onVotar(puntos: number) {
    this.recetasService.valorarReceta(this.recetaModel(), puntos);
  }
}
