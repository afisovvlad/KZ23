import { Injectable } from '@angular/core';
import {DataOrderType} from "../../types/dataOrder.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';
import {ResponseOrder} from '../../types/responseOrder.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderRequest(data: DataOrderType): Observable<ResponseOrder> {
    return this.http.post<ResponseOrder>('https://testologia.ru/order-tea', data);
  }
}
