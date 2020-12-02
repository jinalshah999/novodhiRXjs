import { Product } from './product';

export class ProductData {
  static products: Product[] = [
    {
      id: 1,
      productName: 'Tshirt',
      productCode: 'CDN-1234',
      description: 'Some description here',
      price: 29.95,
      categoryId: 1,
      quantityInStock: 15,
      supplierIds: [1, 2],
    },
    {
      id: 2,
      productName: 'Jeans',
      productCode: 'CDN-2345',
      description: 'Some description here',
      price: 32.99,
      categoryId: 1,
      quantityInStock: 2,
      supplierIds: [3, 4],
    },
    {
      id: 3,
      productName: 'Titan',
      productCode: 'TTX-3456',
      description: 'Some description here',
      price: 38.9,
      categoryId: 2,
      quantityInStock: 8,
      supplierIds: [5, 6],
    },
    {
      id: 8,
      productName: 'Timex',
      productCode: 'TTX-4567',
      description: 'Some description here',
      price: 11.55,
      categoryId: 2,
      quantityInStock: 6,
      supplierIds: [7, 8],
    },
    {
      id: 10,
      productName: 'TV',
      productCode: 'EMT-6789',
      description: 'Some description here',
      price: 35.95,
      categoryId: 3,
      quantityInStock: 12,
      supplierIds: [9, 10],
    },
  ];
}
