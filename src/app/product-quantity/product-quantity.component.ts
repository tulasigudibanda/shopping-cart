import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {
  @Input('product') product : Product;
  @Input('shopping-cart') shoppingCart;
  
    constructor(private shoppingCartService : ShoppingCartService) { }
  
    addToCart() {
      this.shoppingCartService.addToCart(this.product);
    }
  
    removeFromCart() {
      this.shoppingCartService.removeFromCart(this.product);
    }
  
  
    getQuantity() {
      if(!this.shoppingCart) return 0;
  
      const item = this.shoppingCart.itemsMap[this.product.key];
      return item ? item.quantity : 0;
    }
}
