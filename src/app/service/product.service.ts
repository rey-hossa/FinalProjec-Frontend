import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private _url = environment.apiUrl + '/api/products';
  private cart_url = environment.apiUrl + '/api/cart';
  private orders_url = environment.apiUrl + '/api/order';

  constructor(private http:HttpClient) { }

  list() : Observable<IProduct>{
    return this.http.get<IProduct>(this._url);
  }

  add(product:IProduct) : Observable<IProduct>{
    return this.http.post<IProduct>(this._url, product);
  }

  update(product:IProduct) : Observable<IProduct>{
    return this.http.put<IProduct>(`${this._url}/${product.id}`, product);
  }

  delete(product:IProduct) : Observable<IProduct>{
    return this.http.delete<IProduct>(`${this._url}/${product.id}`);
  }

  // -------------------------------- Cart ------------------------------------------------

  cartList(){
    return this.http.get(this.cart_url);
  }

  userCartList(user: any){
    // console.log(user);
    
    return this.http.get(this.cart_url +"/"+user);
  }

  addCartItem(product: any){
    return this.http.post(this.cart_url, product);
  }

  updateCartItem(itemId: any, cartItem: any){
    return this.http.put(this.cart_url +"/"+itemId, cartItem);
  }

  deleteCartItem(itemId: any){
    // console.log(itemId);
    
    return this.http.delete(this.cart_url +"/"+itemId);
  }

  // -------------------------------- Order ------------------------------------------------

  addOrderItems(orderItems: any){
    return this.http.post(this.orders_url, orderItems);
  }

  userOrdersList(user: any){
    
    return this.http.get(this.orders_url +"/"+user);
  }

  deleteOrderItem(itemId: any){
    // console.log(itemId);
    
    return this.http.delete(this.orders_url +"/"+itemId);
  }

  


}


