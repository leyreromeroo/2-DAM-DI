import { Component, OnInit } from '@angular/core';
import { ServicioRecetas } from '../../../services/servicio-recetas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit {
  tiposReceta: any[] = [];

  constructor(private recetasService: ServicioRecetas) { }

  ngOnInit() {
    this.recetasService.getTiposReceta().subscribe(tipos => {
      this.tiposReceta = tipos;
    });
  }

  filtrarPorCategoria(id: number | null) {
    this.recetasService.setFiltroCategoria(id);
  }
}

