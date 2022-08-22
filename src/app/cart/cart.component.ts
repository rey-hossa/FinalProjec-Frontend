import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: any;
  user = localStorage.getItem('user');
  cartItemToUpdate: any;
  totale: number = 0;

  orderToAdd: any;

  popup = false;


  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.service.userCartList(this.user)
      .subscribe(res => {
        this.cartItems = res;
        console.log(this.cartItems);
        this.calcolaTotale();
        
      }); 
  }

  updateCartMinus(cartItemId: any ,quantity: number){

    if(quantity == 1){
      this.deleteCart(cartItemId);
    }

    if(quantity > 1){
      this.cartItemToUpdate = { 'quantity': quantity - 1 }

      this.service.updateCartItem(cartItemId , this.cartItemToUpdate)
      .subscribe(res => {
        this.resetTotale();
        this.getCart();
      }); 
    }
    
  }

  updateCartPlus(cartItemId: any ,quantity: number){

    this.cartItemToUpdate = { 'quantity': quantity + 1 }

    this.service.updateCartItem(cartItemId , this.cartItemToUpdate)
      .subscribe(res => {
        this.resetTotale();
        this.getCart();
      }); 
  }

  deleteCart(cartItemId: any){
    this.service.deleteCartItem(cartItemId)
      .subscribe(res => {
        this.resetTotale();
        this.getCart();
      });
  }

  calcolaTotale(){
    this.cartItems.forEach((item: any) => { 
      this.totale = this.totale + (parseInt(item.price,10) * parseInt(item.quantity,10)); 
    });
  }

  resetTotale(){
    this.totale = 0;
  }

  AddOrder(){
    
    console.log(this.cartItems);

    let today = new Date().toLocaleDateString();  

    this.cartItems.forEach((item: any) =>{
      this.orderToAdd = {
        'user_id' : this.user,
        'product_id' : item.product,
        'quantity': item.quantity,
        'order_date': today
      }

      this.service.addOrderItems(this.orderToAdd)
        .subscribe(res => {
          console.log(res);
        });

      this.deleteCart(item.id);

    })

    this.popup = true;
    
  }

  hidePopup(val: boolean) {
    this.popup = val;
  }

}
