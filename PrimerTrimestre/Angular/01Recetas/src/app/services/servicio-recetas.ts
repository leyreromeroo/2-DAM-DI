import { Injectable, inject } from '@angular/core';
import { RecetaModel } from '../models/recetaModel';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicioRecetas {
  private apiUrl = 'http://127.0.0.1:8000/api';

  private _recetas = new BehaviorSubject<RecetaModel[]>([]);
  private _filtroCategoria = new BehaviorSubject<number | null>(null); // Filtro por ID de tipo

  public recetas$: Observable<RecetaModel[]> = combineLatest([
    this._recetas.asObservable(),
    this._filtroCategoria.asObservable(),
  ]).pipe(
    map(([recetas, categoriaId]) => {
      if (!categoriaId) {
        return recetas;
      }
      return recetas.filter((r) => r.type.id === categoriaId);
    })
  );

  constructor(private http: HttpClient) {
    this.cargarRecetas();
  }

  setFiltroCategoria(categoriaId: number | null) {
    this._filtroCategoria.next(categoriaId);
  }

  getRecetas(): Observable<RecetaModel[]> {
    return this.recetas$;
  }

  cargarRecetas() {
    this.http.get<RecetaModel[]>(`${this.apiUrl}/recipes`).subscribe((data) => {
      this._recetas.next(data);
    });
  }

  crearReceta(receta: any) {
    this.http.post<any>(`${this.apiUrl}/recipes`, receta).subscribe(() => {
      this.cargarRecetas(); // Refrescar siempre
    });
  }

  borrarReceta(id: number) {
    this.http.delete(`${this.apiUrl}/recipes/${id}`).subscribe(() => {
      this.cargarRecetas(); // Refrescar siempre
    });
  }

  valorarReceta(recipeId: number, rate: number) {
    this.http.post<any>(`${this.apiUrl}/recipes/${recipeId}/rating/${rate}`, {}).subscribe(() => {
      this.cargarRecetas(); // Refrescar siempre
    });
  }

  getTiposReceta(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recipe-types`);
  }

  getNutrientes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/nutrient-types`);
  }
}
