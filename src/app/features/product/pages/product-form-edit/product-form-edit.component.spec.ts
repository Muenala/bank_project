import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormEditComponent } from './product-form-edit.component';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import { CommonModule } from '@angular/common';

describe('ProductFormEditComponent', () => {
  let component: ProductFormEditComponent;
  let fixture: ComponentFixture<ProductFormEditComponent>;

  const mockProductService = {
    getProduct: () => of({}),
    updateProduct: () => of({}),
    verifyId: () => of(false)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductFormEditComponent,
        BpInputComponent
      ],
      providers: [
        { provide: ProductService, useValue: mockProductService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.form).toBeTruthy();
  });
});