import { Component, OnInit } from '@angular/core';
import { ProductSearchComponent } from "../../components/product-search/product-search.component";
import { ProductPaginationComponent } from "../../components/product-pagination/product-pagination.component";
import { ProductTableComponent } from '../../components/product-table/product-table.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductSearchComponent, HttpClientModule, CommonModule   ,ProductTableComponent, ProductPaginationComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [ProductService ]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 20];
  totalResults: number = 0;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (error) => console.error('Error fetching products', error)
    });
  }

  applyFilter(term: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(term.toLowerCase())
    );
    this.totalResults = this.filteredProducts.length;
  }



  onPageSizeChange(size: number): void {
    this.pageSize = size;
  }
}