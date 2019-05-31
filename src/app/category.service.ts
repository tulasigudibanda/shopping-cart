import { Injectable } from '@angular/core';
import { FirebaseDatabase } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db : AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories', ref => (ref.orderByChild('name')))
    .snapshotChanges().pipe(
      map(actions => 
        actions.map(a => ({ key: a.key, ...a.payload.val() }))
      )
    );
   // return this.db.list('/categories').valueChanges();
   // return this.db.list('/categories', ref => ref.orderByChild('name')).valueChanges();
  }
 
}
