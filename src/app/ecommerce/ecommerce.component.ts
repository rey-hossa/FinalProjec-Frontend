import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit {

  public products = [] as any;
  productToAdd: any;
  user = localStorage.getItem('user');
  cartItems:any;

  popup = false;


  constructor(private service:ProductService) { }

  ngOnInit(): void {

    this.getList();
    this.getCart();
  }

  getCart(){
    this.service.userCartList(this.user)
      .subscribe(res => {
        this.cartItems = res;
        console.log(this.cartItems);
        this.cartControl();
        
      });
  }

  cartControl(){
    this.products.forEach((productItem: any) =>{
      // console.log(productItem);
      productItem['isInCart'] = false;


      this.cartItems.forEach((cartItem: any) =>{
        // console.log(cartItem);
        if(productItem.id == cartItem.product){
          console.log('ciao');
          productItem['isInCart'] = true;
          
        }
        
        
      })
      
    })
    console.log(this.products);
    
    
    // return false;
  }

  getList(){
    this.service.list()
      .subscribe(response => {
        this.products = response;
        console.log(this.products);
      });
      
  }

  addCart(index:any ,product_id: String, price: number){

    this.productToAdd = {
      'user_id' : this.user,
      'product_id' : product_id,
      'quantity': 1
    }
    console.log(this.productToAdd);
    


    this.service.addCartItem(this.productToAdd)
      .subscribe(res => {
        console.log(res);
        this.products[index]['isInCart'] = true;
        this.popup = true;
      });
  }

  hidePopup(val: boolean) {
    this.popup = val;
  }

}
