import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ProductType} from '../../../../../types/product.type';
import {ProductService} from '../../../../services/product.service';

declare var $: any;

@Component({
  selector: 'catalog-component',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss',
})
export class CatalogComponent implements OnInit, OnDestroy {
  products: null | ProductType[] = null;
  productSubscription: Subscription | null = null;

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productSubscription = this.productService.getProducts().subscribe((products: ProductType[]) => {
      this.products = products;
    });

    $('.product-item-image').magnificPopup({
      type: 'image',
    });
  }

  ngOnDestroy() {
    this.productSubscription?.unsubscribe();
  }
}
