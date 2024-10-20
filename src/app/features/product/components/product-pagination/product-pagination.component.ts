import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-pagination',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-pagination.component.html',
  styleUrl: './product-pagination.component.scss'
})
export class ProductPaginationComponent {
  @Input() totalResults: number = 0;
  @Input() pageSize: number = 5;
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Output() pageSizeChange = new EventEmitter<number>();

  onPageSizeChange(size: number): void {
    this.pageSizeChange.emit(size);
  }
}
