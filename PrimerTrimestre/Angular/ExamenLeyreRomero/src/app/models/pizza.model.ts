export class PizzaModel {
  id: string;
  nombre: string;
  precio: number;
  fotoUrl: string;
  ingredientes: string[]; 
  
  // Nueva propiedad para guardar las CLASES de los iconos de Font Awesome
  ingredienteIconos: string[];

  constructor(
    id: string, 
    nombre: string, 
    precio: number, 
    fotoUrl: string, 
    ingredienteNames: string[], 
    iconMap: { [key: string]: string } 
  ) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.fotoUrl = fotoUrl;
    this.ingredientes = ingredienteNames; 

    // Llama a la lógica de mapeo para obtener las clases de iconos
    this.ingredienteIconos = this.mapIngredientsToIcons(ingredienteNames, iconMap); 
  }

  // Lógica de conversión
  private mapIngredientsToIcons(names: string[], map: { [key: string]: string }): string[] {
    return names
      .map(name => map[name] || 'fa-solid fa-circle-question') // Si no encuentra el nombre, usa un icono por defecto
      .filter(icon => icon !== null);
  }
}