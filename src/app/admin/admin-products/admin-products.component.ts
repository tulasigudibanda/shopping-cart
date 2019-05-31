import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/shared/models/product';
//import { DataTableResource } from 'angular5-data-table';
//import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  //products$;      // cant use this observable for filtering as v r downloading all the products in client page
 // products : any[];
 filteredProducts : Product[] = [];
  products : Product[] = [];   // ideal way but not working for some reason. Getting this error:  Type '{}' is missing the following properties from type 'Product': title, price, category, imageUrlts(2322)
  subscription : Subscription;
 // tableResource : DataTableResource<Product>;
  //items: Product[] = [];
  //itemCount: number;


  constructor(private productService : ProductService) { 
   // this.products$ = this.productService.getAll();
    this.subscription = this.productService.getAll().subscribe(products => {
      const temp : any[] = products;
      this.filteredProducts = this.products = temp;
    //  this.initilizeTable(this.products);
    // console.log(this.products);
    });
  }

  /*private initilizeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0})    //indicates to return records in page 1
    .then(items => this.items = items);
    this.tableResource.count()
    .then(count => this.itemCount = count);
  }

  reloadItems(params) {
    if (!this.tableResource) { return; }
    this.tableResource.query(params)
    .then(items => this.items = items);
  }*/


  filter(query: string) {
    this.filteredProducts = (query) ?
    this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
    this.products;
    //console.log(query);
  }
 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {}
 
}
