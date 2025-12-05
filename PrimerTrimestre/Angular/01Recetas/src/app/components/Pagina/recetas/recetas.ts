import { Component, OnInit } from '@angular/core'; // Importar OnInit
import { RecetaModel } from '../../../models/recetaModel';
import { Receta } from '../../Molecula/receta/receta';
import { NuevaReceta } from '../../Organismo/nueva-receta/nueva-receta';
import { CommonModule } from '@angular/common'; // Necesario para directivas como *ngIf o eventos (input)
import { ServicioRecetas } from '../../../services/servicio-recetas';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recetas',
  // Se añade CommonModule para las directivas y el manejo de eventos en el template
  imports: [Receta, NuevaReceta, CommonModule],
  // Nota: Si usas Angular moderno, considera añadir 'standalone: true' si no lo tiene.
  templateUrl: './recetas.html',
  styleUrl: './recetas.scss',
})
export class Recetas implements OnInit {

  private subscriptionUpdate: Subscription | null = null;
  constructor(private recetasService: ServicioRecetas) {}

  // Estado
  recetas: RecetaModel[] = []; // Todas las recetas de la API
  recetasFiltradas: RecetaModel[] = []; // Las que mostramos
  
  // Filtros
  filtroTitulo: string = '';
  filtroMinimoEstrellas: number = 0;

  ngOnInit() {
    this.cargarRecetas();
  }

  cargarRecetas() {
    this.recetasService.getRecetas().subscribe(data => {
      this.recetas = data;
      this.aplicarFiltros();
    });
  }

  // Manejo de filtros
  onFiltrarTexto(event: any) {
    this.filtroTitulo = event.target.value;
    this.aplicarFiltros();
  }

  onFiltrarRating(event: any) {
    this.filtroMinimoEstrellas = Number(event.target.value);
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    this.recetasFiltradas = this.recetas.filter(r => {
      const coincideTexto = r.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase());
      const coincideRating = Math.round(r.puntuacion) >= this.filtroMinimoEstrellas;
      return coincideTexto && coincideRating;
    });
  }

  // Acciones
  onDelete(id: string) {
    this.recetasService.borrarReceta(id).subscribe(() => {
      this.recetas = this.recetas.filter(r => r.id !== id);
      this.aplicarFiltros();
    });
  }

  onVotar(receta: RecetaModel, puntos: number) {
    this.recetasService.valorarReceta(receta, puntos).subscribe(recetaActualizada => {
      // Actualizamos la lista local con el nuevo dato de la API
      const index = this.recetas.findIndex(r => r.id === receta.id);
      if (index !== -1) {
        this.recetas[index] = recetaActualizada;
        this.aplicarFiltros(); // Reaplicar filtros por si cambia el orden o visibilidad
      }
    });
  }
  
  agregarNuevaReceta(datos: any) {
     // Asegúrate de inicializar puntuacion y votos en 0 al crear
     const nuevaReceta = { ...datos, puntuacion: 0, votos: 0 };
     this.recetasService.crearReceta(nuevaReceta).subscribe(r => {
        this.recetas.push(r);
        this.aplicarFiltros();
     });
  }
}