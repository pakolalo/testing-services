import { of } from "rxjs";

export class FakeValueService {

  constructor() { }

  private value = 'my value';

  getValue() {
    return this.value;
  }

  setValue(value: string) {
    this.value = value;
   }

  getPromiseValue() {
    return Promise.resolve('promise value');
  }

  getObservableValue() {
    return of('observable value');
  }
}
