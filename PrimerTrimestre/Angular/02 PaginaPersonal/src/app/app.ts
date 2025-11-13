import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet, RouterLinkActive } from "@angular/router";
import { Profile } from "./profile/profile";
import { FrmContacto } from './frm-contacto/frm-contacto';
import { LstContactos } from './lst-contactos/lst-contactos';

@Component({
  selector: 'app-root',
  imports: [Profile, RouterOutlet, FrmContacto, RouterLink, RouterLinkActive,LstContactos],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('PaginaPersonal');
}
