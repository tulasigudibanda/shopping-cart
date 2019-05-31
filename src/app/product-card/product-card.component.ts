import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
@Input('product') product : Product;
@Input('show-actions') ShowActions = true;
@Input('shopping-cart') shoppingCart : ShoppingCart;
//@Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService : ShoppingCartService) { }

  addToCart() {
    this.shoppingCartService.addToCart(this.product);
  }

  getQuantity() {
    if (!this.shoppingCart) { return 0; }
     console.log(this.shoppingCart);
     console.log(this.shoppingCart.itemsMap);
    const item = this.shoppingCart.itemsMap[this.product.key];
   //const item = this.shoppingCart.payload.val().items[this.product.key];

    return item ? item.quantity : 0;
  }

}
