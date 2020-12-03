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

  private categorySelectedSubject = new BehaviorSubject<number>(0);
  categorySelectedAction$ = this.categorySelectedSubject.asObservable();

  onSelected(categoryId: string): void {
    this.categorySelectedSubject.next(+categoryId);
  }

  product$ = combineLatest([
    this.productService.productwithadd$,
    this.categorySelectedAction$,
  ]).pipe(
    map(([products, selectedCategoryId]) => {
      return products.filter((x) =>
        selectedCategoryId ? x.categoryId == selectedCategoryId : true
      );
    })
  );

  onAdd(): void {
    this.productService.addProduct();
  }
}
