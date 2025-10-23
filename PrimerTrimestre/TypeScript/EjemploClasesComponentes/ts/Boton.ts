abstract class Boton {
  protected id: string;
  protected label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  abstract accion(datos: string[]): void;

  render(): HTMLButtonElement {
    const button = document.createElement("button");
    button.id = this.id;
    button.textContent = this.label;
    return button;
  }
}

export default Boton;


