import { Injectable } from '@angular/core';
import { FrmContactoModel } from '../models/frm-contactoModel';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  //Definimos unas variables donde creamos el ReplyMessageel Observable de ese objeto.
  updateSubject: ReplaySubject<any> = new ReplaySubject();
  changesOnContacts: Observable<any> = this.updateSubject.asObservable();

  constructor(private http: HttpClient) {}

  contactosRealizados: FrmContactoModel[] = [
    new FrmContactoModel('miguel_goyena@cuatrovientos.org', 'Hello Miguel!!'),
  ];
  anadirContacto(contacto: FrmContactoModel) {
    // 1. Haces el POST pasando la URL y el objeto (body)
     this.http.post<FrmContactoModel>(
      'https://6790ccf7af8442fd7377c747.mockapi.io/contacts',
      contacto 
    ) // Cierras el post aquí
    .subscribe((newContact) => { // 2. Te suscribes al resultado aquí
        alert('Contact Created:' + JSON.stringify(newContact));
        this.notifyUpdateContact(null);//Notifica un evento a los suscriptores (como un signal) de cambios en contactos y que actualicen su lista
    });
  }
  /* Lo comento ya que lo hago por la API
  listarContactos(): FrmContactoModel[] {
    return this.contactosRealizados;
  }*/

  obtenerContactos(): Observable<FrmContactoModel[]> {
    return this.http.get<FrmContactoModel[]>(
      'https://6790ccf7af8442fd7377c747.mockapi.io/contacts'
    );
  }
  /*
 Notificamos del cambio en un contacto: Emite los puntos a los que estemos suscritos
 */
  notifyUpdateContact(data: any) {
    this.updateSubject.next(data);
  }

  
}
