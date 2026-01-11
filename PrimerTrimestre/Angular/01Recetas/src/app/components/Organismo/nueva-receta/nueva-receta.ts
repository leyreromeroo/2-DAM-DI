import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ServicioRecetas } from '../../../services/servicio-recetas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nueva-receta',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './nueva-receta.html',
  styleUrl: './nueva-receta.scss'
})
export class NuevaReceta implements OnInit {
  tiposReceta: any[] = [];
  tiposNutriente: any[] = [];
  nuevaRecetaForm: FormGroup;

  constructor(private recetasService: ServicioRecetas, private fb: FormBuilder) {
    this.nuevaRecetaForm = this.fb.group({
      title: ['', Validators.required],
      'number-diner': [1, [Validators.required, Validators.min(1)]],
      'type-id': ['', Validators.required],
      ingredients: this.fb.array([], Validators.required),
      steps: this.fb.array([], Validators.required),
      nutrients: this.fb.array([]),
      foto: [null] // Para validación en plantilla
    });
  }

  imagenPreview: string | null = null;

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagenPreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.recetasService.getTiposReceta().subscribe(tipos => this.tiposReceta = tipos);
    this.recetasService.getNutrientes().subscribe(nutrientes => this.tiposNutriente = nutrientes);
  }

  get ingredients() { return this.nuevaRecetaForm.get('ingredients') as FormArray; }
  get steps() { return this.nuevaRecetaForm.get('steps') as FormArray; }
  get nutrients() { return this.nuevaRecetaForm.get('nutrients') as FormArray; }

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: ['', Validators.required],
      quantity: [0, Validators.required],
      unit: ['', Validators.required]
    }));
  }

  removeIngredient(index: number) { this.ingredients.removeAt(index); }

  addStep() {
    this.steps.push(this.fb.group({
      order: [this.steps.length + 1],
      description: ['', Validators.required]
    }));
  }

  removeStep(index: number) { this.steps.removeAt(index); }

  addNutrient() {
    this.nutrients.push(this.fb.group({
      'type-id': ['', Validators.required],
      quantity: [0, Validators.required]
    }));
  }

  removeNutrient(index: number) { this.nutrients.removeAt(index); }

  onSubmit(): void {
    if (this.nuevaRecetaForm.invalid) {
      alert('Por favor, completa todos los campos requeridos (mínimo 1 ingrediente y 1 paso).');
      return;
    }

    const payload = this.nuevaRecetaForm.value;
    // Asegurar que el type-id sea número
    payload['type-id'] = Number(payload['type-id']);

    this.recetasService.crearReceta(payload);
    alert('Receta creada con éxito');
    this.nuevaRecetaForm.reset();
    // Limpiar arrays
    while (this.ingredients.length) this.ingredients.removeAt(0);
    while (this.steps.length) this.steps.removeAt(0);
    while (this.nutrients.length) this.nutrients.removeAt(0);
  }
}


