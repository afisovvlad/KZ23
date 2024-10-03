import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogModule} from './components/pages/catalog/catalog.module';
import {OrderModule} from './components/pages/order/order.module';
import {MainModule} from './components/pages/main/main.module';



@NgModule({
  declarations: [],
  imports: [
    CatalogModule,
    OrderModule,
    MainModule,
    CommonModule
  ]
})
export class FeatureModule { }
