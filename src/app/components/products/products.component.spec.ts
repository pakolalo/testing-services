import { ComponentFixture, TestBed, fakeAsync,tick } from '@angular/core/testing';
import { of, defer } from 'rxjs';

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

  describe('tests for getAllProducts', () => {

    it('should return product list from service', () => {
      //Arrange
      const productsMock = generateManyProducts(10);
      productService.getAll.and.returnValue(of(productsMock));
      const prevCount = component.products.length;
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      //Assert
      expect(component.products.length).toEqual(productsMock.length + prevCount);
    });

    it('should change the status "loading" => "success"', fakeAsync(() => {
      //Arrange
      const productMock = generateManyProducts(10);
      productService.getAll.and.returnValue(defer(() => Promise.resolve(productMock)));
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading')
      tick();
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('success')
    }));

    it('should change the status "loading" => "error"', fakeAsync(() => {
      //Arrange
      productService.getAll.and.returnValue(defer(() => Promise.reject('error')));
      //Act
      component.getAllProducts();
      fixture.detectChanges();
      expect(component.status).toEqual('loading')
      tick(4000);
      fixture.detectChanges();
      //Assert
      expect(component.status).toEqual('error')
    }));
  });
});
