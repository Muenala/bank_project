import { Component, OnInit } from '@angular/core';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncID } from '../../validators/asyncID.validator';
import { DateValidators } from '../../validators/date.validate';
import { Product } from '../../models/product.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-form-edit',
  standalone: true,
  imports: [BpInputComponent, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-form-edit.component.html',
  styleUrl: './product-form-edit.component.scss',
  providers: [ProductService]

})
export class ProductFormEditComponent implements OnInit {
  form: FormGroup;
  id: string = '';
  constructor(private fb: FormBuilder, private readonly productService: ProductService, private route: ActivatedRoute, private router: Router) {
    this.id = this.route.snapshot.params['id'];


    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [AsyncID(productService, true, this.id)]],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [null, [Validators.required, DateValidators.minDate(new Date)]],
      date_revision: [null, [Validators.required]],
    });

    this.productService.getProduct(this.id).subscribe({
      next: (product: Product) => {
        this.form.patchValue(product);
      }
    })
    this.form.get("id")?.disable();

  }
  ngOnInit() {
    this.setDateRevisionForOneMoreYear();
  }
  goBack(): void {
    this.router.navigate(['/']);
  }

  get valid() {
    return this.form.valid;
  }
  onSubmit() {
    if (this.valid) {
      this.productService.updateProduct(this.id, this.form.getRawValue()).subscribe({
        next: () => {
          this.validateAllForm(this.form);
        }
      })
    } else {
      this.validateAllForm(this.form);

    }
  }
  private validateAllForm(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
      if (control.asyncValidator) {
        control.statusChanges.pipe(
          take(1)
        ).subscribe();
      }
    });
    formGroup.updateValueAndValidity();
  }
  restart() {
    this.form.reset();
    this.form.get("id")?.setValue(this.id)
  }
  setDateRevisionForOneMoreYear() {
    this.form.get('date_release')?.valueChanges.subscribe(value => {
      let newDate = new Date(new Date(value).setFullYear(new Date(value).getFullYear() + 1));
      newDate.setDate(newDate.getDate() + 1);
      this.form.get('date_revision')?.setValue(formatDate(newDate, 'yyyy-MM-dd', 'en'))
    });
  }
}
