import { Component } from '@angular/core';

@Component({
  selector: 'app-nueva-receta',
  imports: [],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.scss'
})
export class NuevaReceta {
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

    console.log('Receta creada:', { titulo, ingredientes, imagen: this.imagenPreview });
    alert('¡Receta creada con éxito!');
    form.reset();
    this.imagenPreview = null;
  }
}


