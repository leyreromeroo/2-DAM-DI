export interface RecetaModel {
  id: string; // MockAPI usa strings por defecto
  titulo: string;
  foto: string;
  ingredientes: string[];
  puntuacion: number; // Promedio 
  votos: number;      // Cantidad total de votos 
}