import { Component} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms' ;
import { RecetaModel } from '../../../models/recetaModel';
import { ServicioRecetas } from '../../../services/servicio-recetas';


@Component({
  selector: 'app-nueva-receta',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.scss'
})
export class NuevaReceta {
  private contador: number = 5; 
  constructor(private recetasService: ServicioRecetas) {}
  
  nuevaRecetaForm = new FormGroup({
    id: new FormControl<string>(''), 
    titulo: new FormControl('', Validators.required),
    // Usamos string|ArrayBuffer|null porque File Reader devuelve esto
    foto: new FormControl<string | ArrayBuffer | null>(null, Validators.required), 
    ingredientes: new FormControl('', Validators.required) 
  });

  imagenPreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagenPreview = reader.result;
        this.nuevaRecetaForm.controls.foto.setValue(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
        // Manejar el caso de que el usuario cancele la selección
        this.nuevaRecetaForm.controls.foto.setValue(null);
        this.imagenPreview = null;
    }
}

  // Se llama con (ngSubmit)="onSubmit()" en el HTML
  onSubmit(): void {
    if (this.nuevaRecetaForm.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      this.nuevaRecetaForm.markAllAsTouched();
      return;
    }
    
    // 1. Generar ID y actualizar el control 
    this.contador++;
    const nuevoId = 'R' + this.contador;

    // 2. Obtener los valores crudos del formulario
    const formValues = this.nuevaRecetaForm.value;

    // 3. Crear el objeto final que coincide con RecetaModel
    const nuevaReceta: RecetaModel = {
      id: nuevoId,
      titulo: formValues.titulo!, //Poner ! al final para permitir nulos
      foto: formValues.foto as string, 
  
      ingredientes: (formValues.ingredientes ?? '')
        .split(/[\n,]+/)
        .map(i => i.trim()) 
        .filter(i => i.length > 0)
      ,
      puntuacion: 0,
      votos: 0
    };

    this.recetasService.crearReceta(nuevaReceta);

    console.log(`¡Receta "${nuevaReceta.titulo}" creada con éxito! ID: ${nuevoId}`);
    
    this.nuevaRecetaForm.reset();
    this.imagenPreview = null;
  }
}


