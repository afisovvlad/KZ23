import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxMaskDirective} from 'ngx-mask';
import {OrderComponent} from './order.component';
import {RouterLink, RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    OrderComponent,
  ],
  imports: [
    RouterModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    CommonModule
  ]
})
export class OrderModule { }
