import { Component, signal } from '@angular/core';
import { Profile } from "./profile/profile";
import { Recetas } from './recetas/recetas';
import { NuevaReceta } from "./nueva-receta/nueva-receta";
import { Navbar } from "./navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [Recetas, NuevaReceta, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //title = signal('Mi página personal');
}
