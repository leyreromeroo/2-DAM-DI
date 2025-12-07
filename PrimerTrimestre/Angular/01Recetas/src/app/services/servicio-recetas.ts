import { Injectable, inject } from '@angular/core';
import { RecetaModel } from '../models/recetaModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioRecetas {
  
  
  // URL de ejemplo de MockAPI (cámbiala por la tuya propia)
  private apiUrl = 'http://localhost:3000/recetas';

  // ESTADO: Aquí guardamos la lista actual de recetas
  private _recetas = new BehaviorSubject<RecetaModel[]>([]);
  
  // EXPONEMOS EL ESTADO: Los componentes se suscriben a esto
  public recetas$ = this._recetas.asObservable();

  constructor(private http: HttpClient) {
    this.cargarRecetas();
  }

  // 1. Devuelve el Observable de la lista de recetas
  getRecetas(): Observable<RecetaModel[]> {
    return this.recetas$;
  }

  // 1.1 Cargar todas
  cargarRecetas() {
    this.http.get<RecetaModel[]>(this.apiUrl).subscribe(data => {
      this._recetas.next(data); // Actualizamos el estado
    });
  }

  // 2. Crear
  crearReceta(receta: any) {
    // Inicializamos votos a 0
    const nueva = { ...receta, puntuacion: 0, votos: 0 };
    this.http.post<RecetaModel>(this.apiUrl, nueva).subscribe(recetaCreada => {
      // Añadimos la nueva receta a la lista actual
      const listaActual = this._recetas.value;
      this._recetas.next([...listaActual, recetaCreada]);
    });
  }

  // 3. Borrar (Llamado desde el hijo)
  borrarReceta(id: string) {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      // Filtramos la lista para quitar la borrada
      const listaActual = this._recetas.value;
      const listaNueva = listaActual.filter(r => r.id !== id);
      this._recetas.next(listaNueva); // Notificamos a todos (incluido el padre)
    });
  }

  // 4. Valorar (Llamado desde el hijo)
  valorarReceta(receta: RecetaModel, nuevaPuntuacion: number) {
    const totalPuntos = receta.puntuacion * receta.votos;
    const nuevosVotos = receta.votos + 1;
    const nuevoPromedio = (totalPuntos + nuevaPuntuacion) / nuevosVotos;

    const cambios = {
      puntuacion: Number(nuevoPromedio.toFixed(1)),
      votos: nuevosVotos
    };

    this.http.put<RecetaModel>(`${this.apiUrl}/${receta.id}`, { ...receta, ...cambios })
      .subscribe(recetaActualizada => {
        // Actualizamos esa receta específica en nuestra lista local
        const lista = this._recetas.value.map(r => 
          r.id === receta.id ? recetaActualizada : r
        );
        this._recetas.next(lista);
      });
  }
}
