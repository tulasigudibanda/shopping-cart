import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';


@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$;
shoppingCartItemCount: number;
quantity;
cart: ShoppingCart = new ShoppingCart(null);
shoppingCart: ShoppingCart;
  

constructor(private shoppingCartService : ShoppingCartService) {}

  async ngOnInit() {
    this.shoppingCartItemCount = 0;
    (await this. shoppingCartService.getCart()).subscribe(cart0 => {
      let data : any = cart0;
      data = data.payload.val().items;
      this.cart = new ShoppingCart(data);
      this.shoppingCartItemCount = this.cart.totalItemsCount;
      console.log(this.shoppingCartItemCount);
      console.log("In shopping-cart.component.ts");
      
    })
  }

  clearCart() {
    this.shoppingCartService.clearCart();
  }

}