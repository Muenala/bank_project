import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSVGComponent } from "../../../../shared/components/icon-svg/icon-svg.component";
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { DropdownAction } from '../../../../shared/models/dropdownAction.model';
import { Router } from '@angular/router';
import { DeleteModalComponent } from '../../../../shared/components/delete-modal/delete-modal.component';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, IconSVGComponent, DropdownComponent, DeleteModalComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() pageSize: number = 5;
  identify: string = "0"
  product!: Product;
  listActions: DropdownAction[] = []
  selectedProductId: string = "";
  deleteModal: boolean = false;
  @Output() productReload = new EventEmitter<void>();

  constructor(private productService: ProductService, private router: Router) {
    this.listActions.push({ name: 'Editar', action: (id: string) => this.router.navigate([`editar/${id}`]) })
    this.listActions.push({ name: 'Eliminar', action: (id: string) => this.openDeleteModal(id) })
  }
  openDeleteModal(id: string) {
    let product = this.products.find(prod => prod.id == id);
    if (product)
      this.product = product
    this.deleteModal = true;
  }
  information() {
  }
  onCloseDeleted(){  
    this.productReload.emit();
    this.deleteModal = false;
  }
  selectIdentify(identify: string) {
    this.identify = identify;
  }
  onProductDeleted() {
    this.productReload.emit();
  }

}
