import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';
import { ShoppingCartItem } from 'src/app/shared/models/shopping-cart-item';
import { Subscription } from 'rxjs';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  
  cart :  ShoppingCart;
  cartSubscription : Subscription;
  

  constructor(
    private shoppingCartService : ShoppingCartService) {}

  async ngOnInit() {
    let cart$ = await this.shoppingCartService.getCart();
    this.cartSubscription = cart$.subscribe(cart => {
      let temp : any;
      temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp)
    });
    
  }
  
  ngOnDestroy() {
    this.cartSubscription.unsubscribe();
  }
  
  
}
