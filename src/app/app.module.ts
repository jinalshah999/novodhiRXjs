import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppData } from './app-data';

import { AppComponent } from './app.component';
import { ProductListComponent } from './products/product-list.component';
import { ProductshellComponent } from './productshell/productshell.component';
import { ProductdetailsComponent } from './productshell/productdetails/productdetails.component';
import { ProductlistingComponent } from './productshell/productlisting/productlisting.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductshellComponent,
    ProductdetailsComponent,
    ProductlistingComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(AppData, { delay: 1000 }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
