import { Component } from '@angular/core';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [BpInputComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      fecha_liberacion: ['', [Validators.required]],
      fecha_revision: ['', [Validators.required]],
    });
  }
}
