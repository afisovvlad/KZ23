import { Injectable } from '@angular/core';
import {DataOrderType} from "../../types/dataOrder.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  orderRequest(data: DataOrderType): Observable<ResponseType> {
    return this.http.post<ResponseType>('https://testologia.ru/order-tea', data);
  }
}
