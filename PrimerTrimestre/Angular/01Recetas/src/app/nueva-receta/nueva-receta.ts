import { Component, Output, EventEmitter} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms' ;
import { RecetaModel } from '../models/recetaModel';


@Component({
  selector: 'app-nueva-receta',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.scss'
})
export class NuevaReceta {
  // El contador debería estar en el servicio/padre, pero lo mantenemos aquí por el momento
  private contador: number = 5; 

  // Definición del FormGroup: Los tipos de los valores deben coincidir con lo que el FormControl maneja
  nuevaRecetaForm = new FormGroup({
    id: new FormControl<string>(''), // El ID se llena justo antes de emitir
    titulo: new FormControl('', Validators.required),
    // Usamos string|ArrayBuffer|null porque File Reader devuelve esto
    foto: new FormControl<string | ArrayBuffer | null>(null, Validators.required), 
    // Usamos string porque es el tipo del input/textarea del formulario
    ingredientes: new FormControl('', Validators.required) 
  });

  imagenPreview: string | ArrayBuffer | null = null;
  // En NuevaReceta.ts:
  @Output() recetaCreada = new EventEmitter<RecetaModel>();

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagenPreview = reader.result;
        // 🔑 CLAVE: Actualizar el valor del FormControl 'foto'
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

    // --- 🔑 TRANSFORMACIÓN DE DATOS CLAVE ---
    
    // 1. Generar ID y actualizar el control (aunque no es estrictamente necesario)
    this.contador++;
    const nuevoId = 'R' + this.contador;
    // this.nuevaRecetaForm.controls.id.setValue(nuevoId); // Opcional, pero bueno para depuración

    // 2. Obtener los valores crudos del formulario
    const formValues = this.nuevaRecetaForm.value;

    // 3. Crear el objeto final que coincide con RecetaModel
    const nuevaReceta: RecetaModel = {
      id: nuevoId,
      titulo: formValues.titulo!,
      foto: formValues.foto as string, // La foto ya tiene la Base64/URL
      // 🔑 CONVERSIÓN DE STRING A ARRAY: Clave para cumplir el modelo
      ingredientes: (formValues.ingredientes ?? '')
        .split('\n') // Separar por saltos de línea
        .map(i => i.trim()) // Limpiar espacios
        .filter(i => i.length > 0) // Quitar líneas vacías
    };

    // 4. Emitir la receta completa (la clase RecetaModel) al padre
    this.recetaCreada.emit(nuevaReceta);

    alert(`¡Receta "${nuevaReceta.titulo}" creada con éxito! ID: ${nuevoId}`);
    
    this.nuevaRecetaForm.reset();
    this.imagenPreview = null;
  }
}


