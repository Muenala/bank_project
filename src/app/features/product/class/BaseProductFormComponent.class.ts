import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';
import { ProductService } from '../services/product.service';
import { DateValidators } from '../validators/date.validate';
import { AsyncID } from '../validators/asyncID.validator';
import { take } from 'rxjs';
import { Product } from '../models/product.model';

@Component({
    selector: 'app-base-form',
    template: '',
    providers: [ProductService]

})
export class BaseProductFormComponent implements OnInit{
    form: FormGroup;
    id:string = "";
    isEditMode:  boolean = false;

    constructor(
        protected fb: FormBuilder,
        protected readonly productService: ProductService

    ) {
        this.form = this.createForm();
    }
    ngOnInit(): void {
        this.setDateRevisionForOneMoreYear();
        }

    get valid() {
        return this.form.valid;
    }

    onSubmit() {
        console.log();
        
        this.validateAllForm(this.form);
        if (this.valid) {
            this.submitForm();
        }
    }

    restart() {
        this.form.reset();
    }

    protected createForm(): FormGroup {
        return this.fb.group({
            id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [AsyncID(this.productService, this.isEditMode, this.id)]],
            name: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
            description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            logo: ['', [Validators.required]],
            date_release: [null, [Validators.required, DateValidators.minDate(new Date)]],
            date_revision: [null, [Validators.required]],
        });
    }

    protected submitForm() {
    }

    private setDateRevisionForOneMoreYear() {
        this.form.get('date_release')?.valueChanges.subscribe(value => {
            let newDate = new Date(new Date(value).setFullYear(new Date(value).getFullYear() + 1));
            newDate.setDate(newDate.getDate() + 1);
            this.form.get('date_revision')?.setValue(formatDate(newDate, 'yyyy-MM-dd', 'en'));
        });
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
}