export class Person {
  constructor (
    public name: string,
    public lastName: string,
    public age: number,
    public height: number,
    public weight: number,
  ) {}

  calcIMC(): string {
    const result = Math.round(this.weight / (this.height * this.height));
    // 0 - 18 = down
    // 19 - 24 = normal
    // 25 - 26 = overweight
    // 27 - 29 = overweight level 1
    // 30 - 39 = ovewrweight level 2
    // 40 = overweight level 3
    if(result <= 0){
      return 'not found';
    } else if(result >= 0 && result <= 18) {
      return 'your weight is down';
    } else if(result >= 19 && result <= 24) {
      return 'your weight is normal';
    } else if(result >= 25 && result <= 26) {
      return 'you are overweight';
    } else if(result >= 27 && result <= 29) {
      return 'you are overweight level 1';
    } else if(result >= 30 && result <= 39) {
      return 'you are overweight level 2';
    } else if(result >= 40) {
      return 'you are overweight level 3';
    } else {
      return 'not found';
    }
  }
}
