// Función para validar los valores introducidos
export function validarNumeros(a: number, b: number): boolean {
  if (isNaN(a) || isNaN(b)) {
    alert("Por favor introduce números válidos");
    return false;
  }
  return true;
}

// Función de suma
export function sumar(a: number, b: number): number {
  return a + b;
}

// Función de resta
export function restar(a: number, b: number): number {
  return a - b;
}


/*const num1 = document.getElementById("num1") as HTMLInputElement;
const num2 = document.getElementById("num2") as HTMLInputElement;
const resultado = document.getElementById("resultado"); 

document.getElementById("btnSuma")?.addEventListener("click", () => {
  const a = parseFloat(num1.value);
  const b = parseFloat(num2.value);

  if (isNaN(a) || isNaN(b)) {
    alert("Por favor introduce números válidos");
    return;
  }

  resultado.innerText = "Resultado: " + (a + b);
});

document.getElementById("btnResta")?.addEventListener("click", () => {
  const a = parseFloat(num1.value);
  const b = parseFloat(num2.value);

  if (isNaN(a) || isNaN(b)) {
    alert("Por favor introduce números válidos");
    return;
  }

  resultado.innerText = "Resultado: " + (a - b);
});*/


