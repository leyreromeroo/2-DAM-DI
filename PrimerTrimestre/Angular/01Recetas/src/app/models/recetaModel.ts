export interface RecetaModel {
  id: string; 
  titulo: string;
  foto: string;
  categoria: string;
  ingredientes: string[];
  puntuacion: number; // Promedio 
  votos: number;      // Cantidad total de votos 
}