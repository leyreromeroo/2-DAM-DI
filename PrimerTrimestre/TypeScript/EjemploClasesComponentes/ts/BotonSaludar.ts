import Boton from "./Boton.js";

class BotonSaludar extends Boton {
  constructor(id: string, label: string) {
    super(id, label);
  }

  accion(datos: string[]): void {
    const nombre = datos[0] || "usuario";
    alert(`¡Hola ${nombre}! Has hecho clic en "${this.label}".`);
  }
}

export default BotonSaludar;
