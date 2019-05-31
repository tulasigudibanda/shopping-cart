import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from 'src/app/shared/models/app-user';
import { app } from 'firebase';
import { Subscription } from 'rxjs/internal/Subscription';
import { map} from 'rxjs/operators';
import { ShoppingCartService } from '../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/shared/models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser : AppUser;
  shoppingCartItemCount : number;

  constructor(private auth : AuthService, private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser =>  this.appUser = appUser);
    this.shoppingCartItemCount = 0;
    let cart$ = await this.shoppingCartService.getCart();
      cart$.subscribe(temp0 => {
      let temp : any = temp0;
      let data : any = temp.payload.val().items;
      this.shoppingCartItemCount = new ShoppingCart(data).totalItemsCount;

    /*let cart$ = await this.shoppingCartService.getCart();
      cart$.subscribe(cart => {
      let temp : any = cart;


      this.shoppingCartItemCount = 0;
      for (let productId in temp.payload.val().items) 
      this.shoppingCartItemCount += temp.payload.val().items[productId].quantity;
      console.log(this.shoppingCartItemCount);
    
    })*/
      });
  }
    
  logout() {
    this.auth.logout();
  }

}