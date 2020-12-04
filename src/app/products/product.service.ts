import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Observable,
  throwError,
  combineLatest,
  Subject,
  merge,
  BehaviorSubject,
  of,
  from,
  EMPTY,
  concat,
} from 'rxjs';
import {
  catchError,
  tap,
  map,
  scan,
  shareReplay,
  filter,
  switchMap,
  mergeMap,
  toArray,
} from 'rxjs/operators';

import { Product } from './product';
import { ProductCategoryService } from '../product-categories/product-category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  constructor(
    private http: HttpClient,
    private productcategoryservice: ProductCategoryService
  ) {}

  products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    tap((data) => console.log('products ', JSON.stringify(data))),
    catchError(this.handleError)
  );

  productswithcategories$ = combineLatest([
    this.products$,
    this.productcategoryservice.categories$,
  ]).pipe(
    map(([products, category]) => {
      return products.map(
        (products) =>
          ({
            ...products,
            price: products.price * 1.5,
            category: category.find((x) => x.id == products.categoryId).name,
          } as Product)
      );
    }),
    catchError(this.handleError)
  );

  private productInsertSubject = new Subject<Product>();
  productInsertedAction$ = this.productInsertSubject.asObservable();

  addProduct(newProduct?: Product) {
    newProduct = {
      id: 42,
      productName: 'Another One',
      productCode: 'TBX-0042',
      description: 'Our new product',
      price: 8.9,
      categoryId: 3,
      category: 'Electronics',
      quantityInStock: 30,
    };
    this.productInsertSubject.next(newProduct);
  }

  productwithadd$ = merge(
    this.productswithcategories$,
    this.productInsertedAction$
  ).pipe(scan((acc: Product[], value: Product) => [...acc, value]));

  private productSelectedSubject = new BehaviorSubject<number>(0);
  productSelectedAction$ = this.productSelectedSubject.asObservable();

  selectedProduct$ = combineLatest([
    this.productswithcategories$,
    this.productSelectedAction$,
  ]).pipe(
    map(([products, selectedProductId]) =>
      products.find((x) => x.id == selectedProductId)
    ),
    catchError(this.handleError)
  );

  selectedProductChanged(productId: number) {
    this.productSelectedSubject.next(productId);
  }
  // getAllPRoducts() {
  //   return this.http.get<Product[]>(this.productsUrl).pipe(
  //     tap((data) => console.log('products ', JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }
  private handleError(err: any) {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      //client side error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      //backend side
      errorMessage = `Backend returned code: ${err.status} : ${err.body.error} `;
    }
    return throwError(errorMessage);
  }
}
