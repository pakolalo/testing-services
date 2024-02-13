import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductsComponent } from './products.component';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../../services/product.service';
import { generateManyProducts } from '../../models/product.mock';

fdescribe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductService>

  beforeEach(async () => {
    const producstServiceSpy = jasmine.createSpyObj('ProductService', ['getAll'])
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, ProductComponent],
      providers: [
        {provide: ProductService, useValue: producstServiceSpy}
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;

    const productsMock = generateManyProducts(3);
    productService.getAll.and.returnValue(of(productsMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
