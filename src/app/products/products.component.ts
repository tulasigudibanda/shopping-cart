import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy  {
//export class ProductsComponent{
products: Product[] = [];
filteredProducts: Product[];
cart: ShoppingCart;
category: string;
subscription: Subscription;

  constructor(
        private route: ActivatedRoute,
        private productService : ProductService,
        private shoppingCartService : ShoppingCartService 
        ) {}

  async ngOnInit() {
    this.subscription = (await this.shoppingCartService.getCart())
    .subscribe(cart => {
      let temp: any;
      temp = cart.payload.child('/items').val();
      this.cart = new ShoppingCart(temp);

     /* let temp: any;
       temp = cart;
       this.cart = temp;*/
      /* console.log("cart in product.com.ts :  1");
       console.log(this.cart.payload.val());
       console.log(this.cart.key);
       console.log("cart in product.com.ts  :  2");*/
    });

    //this.subscription = (await this.shoppingCartService.getCart())
    //        .subscribe(cart => this.cart = cart);  

    this.productService.getAll().pipe(switchMap(products => {
      let temp: any[] = products;
      this.products = temp;
      return this.route.queryParamMap;
    }))
      .subscribe(params => {
        this.category = params.get('category');

        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
        });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}