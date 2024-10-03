import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import {RouterLink, RouterLinkActive} from '@angular/router';
import { FooterComponent } from './components/footer/footer.component';
import {ProductComponent} from './components/product/product.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ProductComponent,
  ],
  exports: [
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ]
})
export class SharedModule { }
