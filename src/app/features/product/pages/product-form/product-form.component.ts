import { Component, OnInit } from '@angular/core';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, formatDate } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { DateValidators } from '../../validators/date.validate';
import { AsyncID } from '../../validators/asyncID.validator';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [BpInputComponent, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
  providers: [ProductService]
})
export class ProductFormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private readonly productService: ProductService, private router: Router) {

    this.form = this.fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [AsyncID(productService, false, "")]],
      name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required]],
      date_release: [null, [Validators.required, DateValidators.minDate(new Date)]],
      date_revision: [null, [Validators.required]],
    });

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
      this.productService.createProduct(this.form.getRawValue()).subscribe({
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
  }
  setDateRevisionForOneMoreYear() {
    this.form.get('date_release')?.valueChanges.subscribe(value => {
      let newDate = new Date(new Date(value).setFullYear(new Date(value).getFullYear() + 1));
      newDate.setDate(newDate.getDate() + 1);
      this.form.get('date_revision')?.setValue(formatDate(newDate, 'yyyy-MM-dd', 'en'))
    });
  }
}
