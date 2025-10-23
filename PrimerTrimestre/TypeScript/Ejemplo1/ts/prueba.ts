function holaMundo(nombre: string) {
    return "Hola mundo, soy " + nombre;
}

let nombre = "Miguel Goyena";
document.getElementById("container").innerHTML =
holaMundo(nombre);