import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from './shared/components/product/product.component';
import {MainComponent} from './feature/components/pages/main/main.component';
import {CatalogComponent} from './feature/components/pages/catalog/catalog.component';
import {OrderComponent} from './feature/components/pages/order/order.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'catalog', component: CatalogComponent},
  {path: 'catalog/:id', component: ProductComponent},
  {path: 'order', component: OrderComponent},
  {path: '**', component: MainComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
