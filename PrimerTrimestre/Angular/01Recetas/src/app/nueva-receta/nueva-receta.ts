import { Component, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators} from '@angular/forms' ;

@Component({
  selector: 'app-nueva-receta',
  imports: [ReactiveFormsModule],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.scss'
})
export class NuevaReceta {
  contador = 5;

  nuevaRecetaForm = new FormGroup({
  id: new FormControl('R' + (++this.contador)),
  titulo: new FormControl('', Validators.required),
  foto: new FormControl('', Validators.required),
  ingredientes: new FormControl('', Validators.required)
  });
 
  imagenPreview: string | ArrayBuffer | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const titulo = (form.querySelector('#titulo') as HTMLInputElement).value;
    const ingredientes = (form.querySelector('#ingredientes') as HTMLTextAreaElement).value;

    if (!titulo || !ingredientes || !this.imagenPreview) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    @Output() nuevaRecetaForm

    alert('¡Receta creada con éxito!');
    form.reset();
    this.nuevaRecetaForm.reset();
    this.imagenPreview = null;
  }
}


