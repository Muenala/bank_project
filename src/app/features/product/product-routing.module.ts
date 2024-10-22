import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductComponent } from './pages/product/product.component';

const routes: Routes = [
    {
      path: '',
      component: ProductListComponent
    },
    {
      path: 'nuevo',
      component: ProductComponent
    },
    {
      path: 'editar/:id',
      component: ProductComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
