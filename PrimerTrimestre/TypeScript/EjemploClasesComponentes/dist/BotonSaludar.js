import Boton from "./Boton.js";
class BotonSaludar extends Boton {
    constructor(id, label) {
        super(id, label);
    }
    accion(datos) {
        const nombre = datos[0] || "usuario";
        alert(`¡Hola ${nombre}! Has hecho clic en "${this.label}".`);
    }
}
export default BotonSaludar;
//# sourceMappingURL=BotonSaludar.js.map