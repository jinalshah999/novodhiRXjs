import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError } from 'rxjs';

import { ProductCategory } from './product-category';
import { tap, catchError, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private productCategoriesUrl = 'api/productCategories';

  constructor(private http: HttpClient) {}

  categories$ = this.http
    .get<ProductCategory[]>(this.productCategoriesUrl)
    .pipe(
      tap((data) => console.log('categories ', JSON.stringify(data))),
      catchError(this.handleError)
    );

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
  getAllCat() {
    return this.http.get<ProductCategory[]>(this.productCategoriesUrl).pipe(
      tap((data) => console.log('categories ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }
}
