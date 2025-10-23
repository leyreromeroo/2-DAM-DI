import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  title = 'Mi página personal';
  //Los signals sirven para recargar las vistas cuando se cambie el contenido del componente
  //Entonces si mis variables van a cambiar (eventos dinámicos) hay que usar signals
  esOculto = signal(false);
  titleBoton = signal('Ocultar');

  toggleName() {
    this.esOculto.set(!this.esOculto());
    if (this.titleBoton() == 'Ocultar') {
      this.titleBoton.set('Mostrar');
    } else {
      this.titleBoton.set('Ocultar');
    }
  }
}
