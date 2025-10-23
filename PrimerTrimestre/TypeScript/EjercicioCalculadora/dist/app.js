import * as Calculadora from "./calculadora.js";
const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const resultado = document.getElementById("resultado");
document.getElementById("btnSuma")?.addEventListener("click", () => {
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    if (!Calculadora.validarNumeros(a, b))
        return;
    resultado.innerText = "Resultado: " + Calculadora.sumar(a, b);
});
document.getElementById("btnResta")?.addEventListener("click", () => {
    const a = parseFloat(num1.value);
    const b = parseFloat(num2.value);
    if (!Calculadora.validarNumeros(a, b))
        return;
    resultado.innerText = "Resultado: " + Calculadora.restar(a, b);
});
//# sourceMappingURL=app.js.map