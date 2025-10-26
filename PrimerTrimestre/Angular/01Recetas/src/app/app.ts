import { Component, signal } from '@angular/core';
import { Recetas } from './recetas/recetas';
import { Navbar } from "./navbar/navbar";
import { NuevaReceta } from './nueva-receta/nueva-receta';

@Component({
  selector: 'app-root',
  imports: [Recetas, Navbar, NuevaReceta],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //title = signal('Mi página personal');
}
