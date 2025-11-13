export class PizzaModel {
  id: string;
  nombre: string;
  precio: number;
  fotoUrl: string;
  ingredientes: string[];


  constructor(id: string, nombre: string, precio: number, fotoUrl: string, ingredientes: string[]) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.fotoUrl = fotoUrl;
    this.ingredientes = ingredientes;
  }
}
