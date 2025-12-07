import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FotoPerfilModel } from '../models/fotoPersonalModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
constructor(private http: HttpClient) {};
photos: FotoPerfilModel[] = [];
  
  // El método debe DEVOLVER un Observable, no suscribirse.
  // El tipo de retorno es Observable<FotoPerfilModel[]>, que es lo que esperas del body.
  obtenerImagenes(): Observable<FotoPerfilModel[]> {
    return this.http
      .get<FotoPerfilModel[]>('https://6790ccf7af8442fd7377c747.mockapi.io/profiles');
  }

  // Puedes eliminar getPhotos() o mantenerlo si tiene otro uso, pero no lo necesitas para este caso.

  getPhotos(): FotoPerfilModel[] {
    return this.photos;
  }
  /*clickImagen() {
    this.clickFoto.emit('He pinchado en la foto: ' + this.title);//Emito el evento con el mensaje
    this.clickFoto.emit(this.mensajeClick());
    //El componente padre (profile) escuchará este evento y mostrará el mensaje en consola
    //Bindeo el putput en el componente padre en () ya que es un evento
  }*/
}
