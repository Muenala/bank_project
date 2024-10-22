import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormEditComponent } from './pages/product-form-edit/product-form-edit.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const routes: Routes = [
    {
      path: '',
      component: ProductListComponent
    },
    {
      path: 'nuevo',
      component: ProductFormComponent
    },
    {
      path: 'editar/:id',
      component: ProductFormEditComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
