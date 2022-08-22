import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderItems: any;
  user = localStorage.getItem('user');

  constructor(private service:ProductService) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(){
    this.service.userOrdersList(this.user)
      .subscribe(res => {
        this.orderItems = res;
        console.log(this.orderItems);
        
      }); 
  }

  deleteOrder(orderItemId: any){
    this.service.deleteOrderItem(orderItemId)
      .subscribe(res => {
        this.getOrders();
      });
  }

}
