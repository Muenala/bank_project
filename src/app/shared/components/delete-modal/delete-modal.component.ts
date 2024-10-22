import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductService } from '../../../features/product/services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../features/product/models/product.model';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss'
})
export class DeleteModalComponent {
  @Input() product!: Product;
  @Output() closeDeleted = new EventEmitter<void>();
  @Output() productDeleted = new EventEmitter<void>();
  constructor(private productService: ProductService) {
  }


  closeModal() {
    this.closeDeleted.emit();
  }
  delete() {
    this.productDeleted.emit();
  }

  deleteProduct() {
    this.productService.deleteProduct(this.product.id).subscribe(() => {
      this.delete();
      this.closeModal();
    });
  }
}
