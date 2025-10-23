class Boton {
    id;
    label;
    constructor(id, label) {
        this.id = id;
        this.label = label;
    }
    render() {
        const button = document.createElement("button");
        button.id = this.id;
        button.textContent = this.label;
        return button;
    }
}
export default Boton;
//# sourceMappingURL=Boton.js.map