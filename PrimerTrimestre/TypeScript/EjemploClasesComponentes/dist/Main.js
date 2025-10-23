import TextBox from "./TextBox.js";
import BotonSaludar from "./BotonSaludar.js";
const textBox1 = new TextBox("nombre", "Nombre:", "");
const boton1 = new BotonSaludar("btnSaludar", "Saludar");
// Insertamos los elementos en el contenedor principal
const app = document.getElementById("app");
app.appendChild(textBox1.render());
app.appendChild(boton1.render());
// Evento del botón
const botonHTML = document.getElementById("btnSaludar");
botonHTML.addEventListener("click", () => {
    const texto = textBox1.getTexto();
    boton1.accion([texto]);
    textBox1.resetearTexto();
});
//# sourceMappingURL=Main.js.map