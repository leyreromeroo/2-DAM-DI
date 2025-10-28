import { Component, signal } from '@angular/core';
import { Recetas } from './components/Pagina/recetas/recetas';
import { Navbar } from "./components/Organismo/navbar/navbar";
import { Footer } from "./components/Organismo/footer/footer";

@Component({
  selector: 'app-root',
  imports: [Recetas, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}
