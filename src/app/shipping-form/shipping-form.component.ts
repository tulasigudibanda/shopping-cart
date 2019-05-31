import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { OrderService } from '../order.service';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';


@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart')cart : ShoppingCart;
  shipping = {};
  userSubscription : Subscription;
  userId : string;

  constructor(
    private router : Router,
    private authService : AuthService,
    private orderService : OrderService) {}

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  async placeOrder() {
    let order = new Order(this.userId,this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);

  } 

}
