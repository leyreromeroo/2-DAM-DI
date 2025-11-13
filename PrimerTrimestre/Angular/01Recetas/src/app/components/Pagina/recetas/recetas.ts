import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { RecetaModel } from '../../../models/recetaModel';
import { Receta } from '../../Molecula/receta/receta';
import { NuevaReceta } from '../../Organismo/nueva-receta/nueva-receta';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf o eventos (input)

@Component({
  selector: 'app-recetas',
  // Se añade CommonModule para las directivas y el manejo de eventos en el template
  imports: [Receta, NuevaReceta, CommonModule],
  // Nota: Si usas Angular moderno, considera añadir 'standalone: true' si no lo tiene.
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss',
})
export class Recetas implements OnInit {
  // Lista original: Mantiene el estado completo de las recetas
  recetasOriginal: RecetaModel[] = [];
  // Lista visible: Es la que se recorre en el template (se filtra)
  recetas: RecetaModel[] = [];
  // Propiedad para almacenar el texto que escribe el usuario para filtrar
  filtroTitulo: string = '';

  // Esta función recibe el ID emitido por el componente hijo.
  onDelete(idReceta: string): void {
    // Buscar y guardar la receta a eliminar de la lista original
    var recetaAEliminar = this.recetasOriginal.find((receta) => receta.id === idReceta);

    // 1. Eliminar de la lista original
    this.recetasOriginal = this.recetasOriginal.filter((receta) => receta.id !== idReceta);
    
    // 2. Volver a aplicar el filtro para que se actualice la lista visible (this.recetas)
    this.aplicarFiltro();
    
    alert(`La receta: ${recetaAEliminar?.titulo} ha sido eliminada.`);
  }

  agregarNuevaReceta(receta: RecetaModel): void {
    // 1. Añadir a la lista original
    this.recetasOriginal.push(receta);
    
    // 2. Volver a aplicar el filtro para que se actualice la lista visible
    this.aplicarFiltro();
    
    alert(`Receta "${receta.titulo}" agregada exitosamente.`);
    console.log('Receta guardada:', receta);
  }
  
  // Función que se llama cuando el usuario escribe en el campo de texto (input)
  onFiltrar(event: Event) {
    // Obtener el valor del input y pasarlo a minúsculas
    this.filtroTitulo = (event.target as HTMLInputElement).value.toLowerCase();
    this.aplicarFiltro();
  }

  // Lógica principal de filtrado
  aplicarFiltro(): void {
    if (!this.filtroTitulo.trim()) {
      // Si el filtro está vacío, mostrar todas las recetas de la lista original
      this.recetas = [...this.recetasOriginal];
    } else {
      // Filtrar por título (insensible a mayúsculas/minúsculas)
      this.recetas = this.recetasOriginal.filter(receta =>
        receta.titulo.toLowerCase().includes(this.filtroTitulo)
      );
    }
  }

  ngOnInit() {
    // Inicialización de datos
    this.recetasOriginal = [
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

    // Al inicio, la lista visible es igual a la lista original
    this.recetas = [...this.recetasOriginal];
  }
}