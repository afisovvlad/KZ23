import { Injectable } from '@angular/core';
import {DataOrderType} from "../../types/dataOrder.type";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderRequest(data: DataOrderType): any {
    return this.http.post('https://testologia.ru/order-tea', {data});
  }
}
