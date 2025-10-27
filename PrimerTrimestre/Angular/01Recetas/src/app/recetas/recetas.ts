import { Component } from '@angular/core';
import { RecetaModel } from '../models/recetaModel';
import { Receta } from '../receta/receta';
import { NuevaReceta } from '../nueva-receta/nueva-receta';

@Component({
  selector: 'app-recetas',
  imports: [Receta, NuevaReceta],
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss',
})
export class Recetas {
  recetas: RecetaModel[] = [];
  idImagen = '';
  foto = '';
  titulo = '';
  ingredientes = [];

  // Esta función recibe el ID emitido por el componente hijo.
  onDelete(idReceta: string): void {
    // La lógica de eliminación permanece aquí, en el dueño de los datos.
    var recetaAEliminar = this.recetas.find((receta) => receta.id === idReceta);
    this.recetas = this.recetas.filter((receta) => receta.id !== idReceta);
    alert(`La receta: ${recetaAEliminar?.titulo} ha sido eliminada.`);
  }
  agregarNuevaReceta(receta: RecetaModel): void {
    this.recetas.push(receta);
    alert(`Receta "${receta.titulo}" agregada exitosamente.`);
    console.log('Receta guardada:', receta);
    // Nota: Aquí es donde normalmente se llamaría a un servicio para guardar en BBDD.
  }

  ngOnInit() {
    // 3. Inicializa el array de recetas con el contenido de tus cards
    this.recetas = [
      {
        id: 'R1', // ID ÚNICO
        foto: './img/images.jpg',
        titulo: 'Bocadillo sin pan de tortilla',
        ingredientes: [
          '2 huevos',
          'Jamón serrano',
          'Queso fundido',
          'Canónigos',
          'Sal y pimienta al gusto',
        ],
      },
      {
        id: 'R2', // ID ÚNICO
        foto: './img/ensalada-mediterranea-de-pollo.webp',
        titulo: 'Ensalada mediterránea',
        ingredientes: [
          'Tomates cherry',
          'Pepino',
          'Queso feta',
          'Aceitunas negras',
          'Aceite de oliva virgen extra',
        ],
      },
      {
        id: 'R3', // ID ÚNICO
        foto: './img/noquis-con-salchicha-elle-gourmet-681713bbcda42.avif',
        titulo: 'Ñoquis con salchicha',
        ingredientes: [
          'Ñoquis de patata',
          'Salchicha italiana',
          'Nata líquida',
          'Ajo y cebolla',
          'Queso parmesano rallado',
        ],
      },
      {
        id: 'R4', // ID ÚNICO
        foto: './img/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg',
        titulo: 'Revuelto de verduras',
        ingredientes: ['Calabacín', 'Zanahoria', 'Cebolla', 'Huevo', 'Aceite de oliva y sal'],
      },
    ];
  }
}
