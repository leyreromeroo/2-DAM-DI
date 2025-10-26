import { Component, signal, SimpleChanges } from '@angular/core';
import { FotoPersonal } from '../foto-personal/foto-personal';
import { FotoPerfilModel } from '../models/fotoPersonalModel';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [FotoPersonal, UpperCasePipe],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  title = 'Mi página personal';
  //Los signals sirven para recargar las vistas cuando se cambie el contenido del componente
  //Entonces si mis variables van a cambiar (eventos dinámicos) hay que usar signals
  imagenClickeada = '';
  esOculto = signal(false);
  titleBoton = signal('Ocultar');
  titlePhoto = 'Yo contenta';
  photos: FotoPerfilModel[] = [];
  srcPhoto =
    'https://media.istockphoto.com/id/904711962/es/vector/mujer-joven-agitando-personaje-avatar-feliz.jpg?s=170667a&w=0&k=20&c=IXW4IiIRqS0BDnbq8XBMkKDsdDbkW8XAxpP5CkKlnfM=';

  ngOnInit() {
     let fotoContento = new FotoPerfilModel(
      'Estoy Contento',
      'https://img.freepik.com/vector-gratis/ilustracion-joven-sonriente_1308-173524.jpg?semt=ais_hybrid&w=740&q=80',
      ''
    );
    let fotoTriste = new FotoPerfilModel(
      'Estoy Triste',
      'https://static.vecteezy.com/system/resources/previews/053/232/166/non_2x/sad-boy-cartoon-avatar-illustration-free-vector.jpg',
      ''
    );
    this.photos = [fotoContento, fotoTriste];
  }  

  ngOnChanges(ngOnChanges: SimpleChanges) {
    console.log('Cambios en el componente padre');
  }

  ngOnDestroy() {
    //Vaciar el array de fotos al destruir el componente
    this.photos = [];
  }

  toggleName() {
    this.esOculto.set(!this.esOculto());
    if (this.titleBoton() == 'Ocultar') {
      this.titleBoton.set('Mostrar');
    } else {
      this.titleBoton.set('Ocultar');
    }
  }
  //Método para escuchar el evento emitido desde el componente hijo (foto-personal)
  ensenarClick(event: string) {
    this.imagenClickeada = event;
  }

  //For de fotos personales
  /*constructor() {
    Mejor práctica inicializar en ngOnInit
  }*/
}
