import { Component } from '@angular/core';
import { NuevaReceta } from "../nueva-receta/nueva-receta";

@Component({
  selector: 'app-navbar',
  imports: [NuevaReceta],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  
}

