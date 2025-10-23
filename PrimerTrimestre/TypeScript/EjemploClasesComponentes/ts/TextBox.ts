class TextBox {
  private id: string;
  private label: string;
  private texto: string;

  constructor(id: string, label: string, texto: string) {
    this.id = id;
    this.label = label;
    this.texto = texto;
  }

  render(): HTMLDivElement {
    const div = document.createElement("div");
    div.classList.add("campo-texto");

    const lbl = document.createElement("label");
    lbl.textContent = this.label;
    lbl.htmlFor = this.id;

    const input = document.createElement("input");
    input.type = "text";
    input.id = this.id;
    input.value = this.texto;

    div.appendChild(lbl);
    div.appendChild(input);

    return div;
  }

  getTexto(): string {
    const input = document.getElementById(this.id) as HTMLInputElement;
    return input.value;
  }
   resetearTexto(): string {
    const input = document.getElementById(this.id) as HTMLInputElement;
    return input.value = "";
  }
}

export default TextBox;
