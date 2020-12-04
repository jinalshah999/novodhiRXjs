import { Component, OnInit } from '@angular/core';
import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  pageTitle = 'product details';

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  constructor(private productService: ProductService) {}
  product$ = this.productService.selectedProduct$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  ngOnInit(): void {}
}
