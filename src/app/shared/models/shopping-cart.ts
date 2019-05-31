import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
    items : ShoppingCartItem[] = [];

    constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
        this.itemsMap = itemsMap || {};
        console.log(this.itemsMap);
        for (let productId in itemsMap) {
            // tslint:disable-next-line:prefer-const
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem(item.product, item.quantity));
        }
    }

   /* getQuantity(product: Product) {
        const item = this.itemsMap[product.key];
        return item ? item.quantity : 0;
      }*/

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items)
        sum += this.items[productId].totalPrice;
        return sum;
    }

    get totalItemsCount() {
        let count = 0;
        for (let productId in this.itemsMap) {
            console.log("In shopping-cart.ts : 0");
            console.log(this.itemsMap[productId]);
            count += this.itemsMap[productId].quantity;
        }
      
        return count;
    }
}