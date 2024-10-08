import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {provideNgxMask} from "ngx-mask";
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
        name: ['', {
          validators: [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]
        }],
        lastName: [null, [Validators.required, Validators.pattern(/^[а-яА-Я]+$/)]],
        phone: [null, [Validators.required, Validators.minLength(10)]],
        country: [null, Validators.required],
        zipcode: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
        product: [null, {
          validators: Validators.required,
          disabled: true
        }],
        address: [null, [Validators.required, Validators.pattern(/^[a-zA-Zа-яА-ЯёЁ0-9 \-]+$/)]],
        comment: [null],
      },
      {
        updateOn: "blur"
      });
  }

  get addressControl() {
    return this.orderForm.get('address');
  }

  get productControl() {
    return this.orderForm.get('product');
  }

  get nameControl() {
    return this.orderForm.get('name');
  }

  get lastNameControl() {
    return this.orderForm.get('lastName');
  }

  get phoneControl() {
    return this.orderForm.get('phone');
  }

  get countryControl() {
    return this.orderForm.get('country');
  }

  get zipcodeControl() {
    return this.orderForm.get('zipcode');
  }

  get commentControl() {
    return this.orderForm.get('comment');
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
    if (this.orderForm.valid) {
      const dataOrder: DataOrderType = {
        name: this.nameControl?.value,
        last_name: this.lastNameControl?.value,
        phone: this.phoneControl?.value,
        country: this.countryControl?.value,
        zip: this.zipcodeControl?.value,
        product: this.productControl?.value,
        address: this.addressControl?.value,
      }

      if (this.commentControl?.value) {
        dataOrder.comment = this.commentControl?.value;
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
      this.orderForm.markAllAsTouched();
    }
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
