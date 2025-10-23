class TextBox {
    id;
    label;
    texto;
    constructor(id, label, texto) {
        this.id = id;
        this.label = label;
        this.texto = texto;
    }
    render() {
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
    getTexto() {
        const input = document.getElementById(this.id);
        return input.value;
    }
    resetearTexto() {
        const input = document.getElementById(this.id);
        return input.value = "";
    }
}
export default TextBox;
//# sourceMappingURL=TextBox.js.map