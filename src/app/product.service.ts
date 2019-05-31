import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products')
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
  }

  get(productId) {
    return this.db.object('/products/' + productId);
  }

  update(productId, product) {
    this.db.object('/products/' + productId).update(product);
  }

  delete(productId) {
    return this.db.object('/products/' + productId).remove();
  }

}
