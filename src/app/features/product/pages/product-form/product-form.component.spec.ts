import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BpInputComponent } from '../../../../shared/components/bp-input/bp-input.component';
import { of } from 'rxjs';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let productService: ProductService;

  beforeEach(async () => {
    const mockProductService = {
      createProduct: jest.fn().mockReturnValue(of({}))
    };
    
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        BpInputComponent
      ],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: mockProductService }
      ]
    }).compileComponents();

    productService = TestBed.inject(ProductService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with an invalid form', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should have all required form controls', () => {
    expect(component.form.get('id')).toBeTruthy();
    expect(component.form.get('name')).toBeTruthy();
    expect(component.form.get('description')).toBeTruthy();
    expect(component.form.get('logo')).toBeTruthy();
    expect(component.form.get('date_release')).toBeTruthy();
    expect(component.form.get('date_revision')).toBeTruthy();
  });

  it('should reset form when restart is called', () => {
    // Set some values
    component.form.patchValue({
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: '2024-01-01',
      date_revision: '2025-01-01'
    });

    // Call restart
    component.restart();

    // Check if form is reset
    expect(component.form.get('id')?.value).toBeNull(); 
    expect(component.form.get('name')?.value).toBeNull();
    expect(component.form.get('description')?.value).toBeNull();
    expect(component.form.get('logo')?.value).toBeNull();
    expect(component.form.get('date_release')?.value).toBe(null);
    expect(component.form.get('date_revision')?.value).toBe(null);
  });
});