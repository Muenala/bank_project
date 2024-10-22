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
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.search.emit(this.searchTerm);
  }

  addNewProduct(){
    this.router.navigate(['/nuevo'])
  }
}