import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../product/product.component';
import { ValueService } from '../../services/value.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rta = '';

  constructor(
    private productService: ProductService,
    private valueService: ValueService,
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAll(this.limit, this.offset)
    .subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: error => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 3000)
      }
    })
  }

  async callPromise() {
    const rta = await this.valueService.getPromiseValue();
    this.rta = rta;
  }
}
