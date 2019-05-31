import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(categoryService : CategoryService) { 
    this.categories$ = categoryService.getCategories();
    console.log("In filter : 1");
    this.categories$.subscribe(categories => console.log(categories));
    console.log("In filter : 2");

  }

  ngOnInit() {
  }

}
