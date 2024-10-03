import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import { provideNgxMask} from "ngx-mask";
import {ProductService} from '../../../../services/product.service';
import {ResponseOrder} from '../../../../../types/responseOrder.type';
import {OrderService} from '../../../../services/order.service';
import {DataOrderType} from '../../../../../types/dataOrder.type';

declare var $: any;

@Component({
  selector: 'order-component',
  standalone: false,
  providers: [
    provideNgxMask(),
  ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit, OnDestroy {
  orderResponse: ResponseOrder | null = null;
  orderForm: FormGroup;

  private subs: Subscription = new Subscription();

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private productService: ProductService, private orderService: OrderService) {
    this.orderForm = this.fb.group({
      name: [null, [Validators.required, Validators.pattern('[а-яА-Я]')]],
      lastName: [null, [Validators.required, Validators.pattern('[а-яА-Я]')]],
      phone: [null, [Validators.required, Validators.minLength(18)]],
      country: [null, [Validators.required]],
      zipcode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      product: [null, {
        validators: Validators.required,
        disabled: true
      }],
      address: [null, [Validators.required, Validators.pattern('[а-яА-Я0-9-/]')]],
      comment: [null],
    })
  }

  get addressControl(): AbstractControl {
    return this.orderForm.controls['address'];
  }

  get productControl(): AbstractControl {
    return this.orderForm.controls['product'];
  }

  ngOnInit() {
    this.subs.add(this.route.queryParams.subscribe((params) => {
      if (params['id']) {
        this.subs.add(this.productService.getProduct(params['id']).subscribe(product => {
          this.productControl?.setValue(product.title);
          this.productControl?.disable({onlySelf: true});
        }));
      }
    }));
  }

  clickToFormButton(): false | void {
    if (!this.orderForm.valid) {
      const dataOrder: DataOrderType = {
        name: this.orderForm.get('name')?.value,
        last_name: this.orderForm.get('lastName')?.value,
        phone: this.orderForm.get('phone')?.value,
        country: this.orderForm.get('country')?.value,
        zip: this.orderForm.get('zipcode')?.value,
        product: this.orderForm.get('product')?.value,
        address: this.orderForm.get('address')?.value,
      }

      if (this.orderForm.get('comment')?.value) {
        dataOrder.comment = this.orderForm.get('comment')?.value;
      }

      this.subs.add(this.orderService.orderRequest(dataOrder).subscribe((response: ResponseOrder) => {
        this.orderResponse = response;
        if (this.orderResponse.success === 0) {
          console.log(this.orderResponse.message);
        } else {
          this.subs.unsubscribe();
          $('#form-block').css('display', 'none');
          $('.form-title').text('Спасибо за заказ. Мы свяжемся с вами в ближайшее время!');
        }
      }));
    } else {
      return false;
    }
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
