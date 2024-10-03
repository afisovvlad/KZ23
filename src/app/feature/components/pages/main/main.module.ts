import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainComponent} from './main.component';
import {RouterLink, RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    RouterModule,
    RouterLink,
    CommonModule
  ]
})
export class MainModule { }
