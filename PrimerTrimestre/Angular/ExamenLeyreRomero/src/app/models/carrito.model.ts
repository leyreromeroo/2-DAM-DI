// CarritoItem.model.ts
export class CarritoItemModel {

  idPizza: string;
  nombre: string;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;

 
  constructor(idPizza: string, nombre: string, cantidad: number, precioUnitario: number, precioTotal: number) {
    this.idPizza = idPizza;
    this.nombre = nombre;
    this.cantidad = cantidad;
    this.precioUnitario = precioUnitario;
    this.precioTotal = precioTotal;
  }


  public get subtotal(): number {
    return this.cantidad * this.precioUnitario;
  }
}