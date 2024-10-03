import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatalogComponent} from './catalog.component';
import {RouterLink, RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    CatalogComponent
  ],
  imports: [
    RouterModule,
    RouterLink,
    CommonModule
  ]
})
export class CatalogModule { }
