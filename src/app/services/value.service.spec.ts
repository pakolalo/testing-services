import { TestBed } from '@angular/core/testing';

import { ValueService } from './value.service';

describe('ValueService', () => {
  let service: ValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[ ValueService ]
    })
    service = TestBed.inject(ValueService);
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Tests for getValue', () => {
    // AAA
    it('Should return my value', () => {
      expect(service.getValue()).toBe('my value');
    });
  });

  describe('Tests for setValue', () => {
    // AAA
    it('Should change the value', () => {
      expect(service.getValue()).toBe('my value');
      service.setValue('change');
      expect(service.getValue()).toBe('change')
    });
  });

  describe('Tests for getPromiseValue', () => {
    // AAA
    it('Should return "promise value" from promise with then', (doneFn) => {
      service.getPromiseValue()
      .then((value) => {
        //assert
        expect(value).toBe('promise value');
        doneFn();
      });
    });

    it('Should return "promise value" from promise with async', async () => {
      const rta = await service.getPromiseValue();
      expect(rta).toBe('promise value')
    });
  });
});
