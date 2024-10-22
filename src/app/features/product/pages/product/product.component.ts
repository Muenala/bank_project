import { Component } from '@angular/core';
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ProductFormComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

}
