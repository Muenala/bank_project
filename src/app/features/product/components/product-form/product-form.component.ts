import { Component } from '@angular/core';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { AsyncID } from '../../validators/asyncId.validator';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [BpInputComponent,FormsModule,ReactiveFormsModule, CommonModule,HttpClientModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  providers:[ProductService ]
})
export class ProductFormComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private readonly   productService: ProductService) {
    this.form = this.fb.group({
      id: ['', [Validators.required,Validators.maxLength(3),Validators.maxLength(10)],[AsyncID(productService)]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      fecha_liberacion: [null, [Validators.required]],
      fecha_revision: [formatDate(new Date, 'yyyy-MM-dd', 'en'), [Validators.required]],
    });
  }
}
