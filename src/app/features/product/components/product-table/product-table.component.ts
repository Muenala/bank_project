import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSVGComponent } from "../../../../shared/components/icon-svg/icon-svg.component";
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { DropdownComponent } from '../../../../shared/components/dropdown/dropdown.component';
import { DropdownAction } from '../../../../shared/models/dropdownAction.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, IconSVGComponent,DropdownComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() pageSize: number = 5;
  identify:string = "0"
  listActions:DropdownAction[] = []
  constructor(private productService: ProductService,private router:Router) { 
    this.listActions.push({ name: 'Editar',  action: (id:string) => this.router.navigate([`editar/${id}`])})
    this.listActions.push({ name: 'Eliminar',  action: (id:string) => this.productService.deleteProduct(id)})
  }
  information() {
  }
  selectIdentify(identify:string){
    this.identify = identify;
  }

 /*  onDelete(product: Product): void {
    if (confirm('¿Está seguro que desea eliminar este producto?')) {
      // Lógica de eliminación
      this.productService.deleteProduct(product.id).subscribe({
        next: () => {
          // Actualizar lista de productos
       
          this.activeDropdown = null;
        },
        error: (error) => {
          console.error('Error deleting product:', error);
        }
      });
    }
  } */
}
