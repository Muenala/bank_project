import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconSVGComponent } from "../../../../shared/components/icon-svg/icon-svg.component";
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-table',
  standalone: true,
  imports: [CommonModule, IconSVGComponent],
  templateUrl: './product-table.component.html',
  styleUrl: './product-table.component.scss'
})
export class ProductTableComponent {
  @Input() products: Product[] = [];
  @Input() pageSize: number = 5;

  information(){
  }
}
