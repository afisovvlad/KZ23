import {Injectable} from "@angular/core";
import {ProductType} from "../../types/product.type";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {
  }

  getProducts(search?: string): Observable<ProductType[]> {
    const params = new HttpParams();
    if (search) {
      params.append('search', search);
    }
    return this.http.get<ProductType[]>('https://testologia.ru/tea', {params});
  }

  getProduct(id: string): Observable<ProductType> {
    const params = new HttpParams().append('id', id);
    return this.http.get<ProductType>('https://testologia.ru/tea', {params});
  }
}
