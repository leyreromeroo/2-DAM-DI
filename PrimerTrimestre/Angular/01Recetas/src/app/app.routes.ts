import { Routes } from '@angular/router';
import { Recetas } from './components/Pagina/recetas/recetas'; // Importar el componente Recetas

export const routes: Routes = [
  // Ruta principal: carga el componente Recetas en la ruta base ('/')
  { path: '', component: Recetas },
  // Opcional: una ruta comodín para redirigir al inicio en caso de ruta no encontrada
  { path: '**', redirectTo: '' }
];
