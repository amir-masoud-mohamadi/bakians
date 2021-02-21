import { Injectable } from '@angular/core';
import {take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  showProduct() {
    return this.http.get('https://service.iranshopee.ir/api/merchant-commodities-shop/1').pipe(take(1));
  }
  showProduct2() {
    return this.http.get('https://service.iranshopee.ir/api/merchant-commodities-shop/1').pipe(take(1));

  }
  showProductOne(id) {
    return this.http.get('https://service.iranshopee.ir/api/merchant-commodities/' + id).pipe(take(1));
  }
  categoryOne() {
    return this.http.get('https://service.iranshopee.ir/api/commodity-categories?id.lessOrEqualThen=10').pipe(take(1));
  }
  search(searches){
    return this.http.get('https://service.iranshopee.ir/api/commodities?page=0&size=100&shopId.equals=1&name.contains=' + searches,{
      observe: 'response'}).pipe(take(1));
  }
  constructor(private http: HttpClient) { }
}
