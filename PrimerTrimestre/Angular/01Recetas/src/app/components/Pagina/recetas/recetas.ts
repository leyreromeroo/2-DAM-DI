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

  constructor(private recetasService: ServicioRecetas) { }

  // Estado
  recetas: RecetaModel[] = [];
  recetasFiltradas: RecetaModel[] = [];

  // Filtros
  filtroTitulo: string = '';
  filtroMinimoEstrellas: number = 0;
  filtroMinCal: number | null = null;
  filtroMaxCal: number | null = null;

  //Se hace la suscripción al cargar el componente
  ngOnInit() {
    // getRecetas() devuelve el BehaviorSubject. Cada vez que el servicio hace next(), 
    // este bloque se ejecuta, actualizando la lista y reaplicando los filtros.
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

  onFiltrarMinCal(event: any) {
    const val = event.target.value;
    this.filtroMinCal = val === '' ? null : Number(val);
    this.aplicarFiltros();
  }

  onFiltrarMaxCal(event: any) {
    const val = event.target.value;
    this.filtroMaxCal = val === '' ? null : Number(val);
    this.aplicarFiltros();
  }

  private aplicarFiltros() {
    this.recetasFiltradas = this.recetas.filter(r => {
      const coincideTexto = r.title.toLowerCase().includes(this.filtroTitulo.toLowerCase());
      const coincideRating = Math.round(r.rating['rating-avg']) >= this.filtroMinimoEstrellas;

      // Cálculo de calorías (asumiendo que quantity en nutrients representa calorías o sumatorio nutricional)
      const totalCal = r.nutrients.reduce((acc, n) => acc + n.quantity, 0);

      const coincideMinCal = this.filtroMinCal === null || totalCal >= this.filtroMinCal;
      const coincideMaxCal = this.filtroMaxCal === null || totalCal <= this.filtroMaxCal;

      return coincideTexto && coincideRating && coincideMinCal && coincideMaxCal;
    });
  }

  // Acciones
  agregarNuevaReceta(datos: any) {
    // Inicializar puntuacion y votos en 0 al crear
    const nuevaReceta = { ...datos, puntuacion: 0, votos: 0 };
    // Llama al servicio y el servicio actualizará el estado (y la suscripción del componente) automáticamente.
    this.recetasService.crearReceta(nuevaReceta);
  }
}