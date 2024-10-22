import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-search.component.html',
  styleUrl: './product-search.component.scss'
})
export class ProductSearchComponent {
  @Output() search = new EventEmitter<string>();
  searchTerm:string = '';
  constructor(
    private  router: Router

  ){

  }
  onSearch(term: string): void {
    this.search.emit(term);
  }

  addNewProduct(){
    this.router.navigate(['/nuevo'])
  }
}