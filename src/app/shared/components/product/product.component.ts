import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductType} from "../../../../types/product.type";
import {ProductService} from "../../../services/product.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'product-component',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent implements OnInit, OnDestroy {
  currentProduct: null | ProductType = null;

  private subs: Subscription = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    this.subs.add(this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.subs.add(this.productService.getProduct(params['id']).subscribe(product => {
          this.currentProduct = product;
        }));
      }
    }));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
