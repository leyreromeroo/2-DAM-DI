
export class ConfiguracionModel {

  titulo: string;
  iconoUrl: string;
  creador: string;


  constructor(titulo: string, iconoUrl: string, creador: string) {
    this.titulo = titulo;
    this.iconoUrl = iconoUrl;
    this.creador = creador;
  }
}