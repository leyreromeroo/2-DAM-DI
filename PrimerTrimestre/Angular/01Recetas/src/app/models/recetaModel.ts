

export class RecetaModel{
 id: string;
 titulo: string;
 foto: string;
 ingredientes: string[];
    // La función que se ejecutará cuando se haga clic en eliminar

    /**
     * Constructor del componente de la tarjeta de receta.
     * @param nombre El nombre de la receta.
     * @param foto La URL de la foto de la receta.
     * @param onDelete El callback que se llamará cuando se pulse el botón de eliminar.
     */
    constructor(id: string, foto: string, titulo: string, ingredientes:string[]) {
        this.id = id;
        this.foto = foto;
        this.titulo = titulo;
        this.ingredientes = ingredientes;
    }

}