import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginaPrincipal } from './components/pagina/pagina-principal/pagina-principal'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaginaPrincipal],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ExamenLeyreRomero');
}
