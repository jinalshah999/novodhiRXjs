import { Component, OnInit } from '@angular/core';
import { Subject, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductService } from 'src/app/products/product.service';
@Component({
  selector: 'app-productlisting',
  templateUrl: './productlisting.component.html',
  styleUrls: ['./productlisting.component.css'],
})
export class ProductlistingComponent implements OnInit {
  pageTitle = 'Products';

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();
  constructor(private prodcutService: ProductService) {}
  product$ = this.prodcutService.productswithcategories$.pipe(
    catchError((err) => {
      this.errorMessageSubject.next(err);
      return EMPTY;
    })
  );
  ngOnInit(): void {}
  onSelected(prodctid: number) {
    this.prodcutService.selectedProductChanged(prodctid);
  }
}
