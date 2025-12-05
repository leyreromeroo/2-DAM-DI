export interface RecetaModel {
  id: string; // MockAPI usa strings por defecto
  titulo: string;
  foto: string;
  ingredientes: string[];
  // Nuevos campos para el sistema de estrellas
  puntuacion: number; // Promedio (ej: 4.5)
  votos: number;      // Cantidad total de votos (ej: 10)
}