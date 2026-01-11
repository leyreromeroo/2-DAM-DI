import { Component } from '@angular/core';
import { ServicioRecetas } from '../../../services/servicio-recetas';


@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor(private recetasService: ServicioRecetas) { }

  filtrarPorCategoria(categoria: string | number | null) {
    const id = categoria === null ? null : Number(categoria);
    this.recetasService.setFiltroCategoria(id);
  }
}

