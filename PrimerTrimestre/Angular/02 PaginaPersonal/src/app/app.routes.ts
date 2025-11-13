import { Routes } from '@angular/router';
import { FrmContacto } from './frm-contacto/frm-contacto';
import { Profile } from './profile/profile';
import { LstContactos } from './lst-contactos/lst-contactos';

export const routes: Routes = [
 { path: 'informacion-perfil', component: Profile },
 { path: 'informacion-contacto', component: FrmContacto },
 {path: 'lista-contacto', component: LstContactos}

];