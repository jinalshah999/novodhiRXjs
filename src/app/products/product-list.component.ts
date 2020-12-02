import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductService } from './product.service';
import { catchError, map, startWith } from 'rxjs/operators';
import { EMPTY, Subject, combineLatest, of, BehaviorSubject } from 'rxjs';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  pageTitle = 'Product List';

  //Error handling
  private errorMessageSubject = new Subject<string>();
  errorMessageAction$ = this.errorMessageSubject.asObservable();

  constructor(
    private productcategoryService: ProductCategoryService,
    private productService: ProductService
  ) {}
  categories$ = this.productcategoryService.categories$.pipe(
    catchError((error) => {
      return EMPTY;
    })
  );
  product$ = this.productService.productswithcategories$;
  onSelected(categoryId: string): void {}

  onAdd(): void {}
}
