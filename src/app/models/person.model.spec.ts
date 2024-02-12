import { Person } from "./person.model";

describe('Tests for Person', () => {
  let person: Person;

  beforeEach(() => {
    person = new Person('Isco', 'del Collado', 33, 1.73, 80)
  });

  it('attrs', () => {
    expect(person.name).toEqual('Isco');
    expect(person.lastName).toEqual('del Collado');
    expect(person.age).toEqual(33);
    expect(person.height).toEqual(1.73);
    expect(person.weight).toEqual(80);
  });

  describe('tests for calcIMC', () => {

    it('should return a string: not found', () => {
      //Arrange
      person.weight = 0
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('not found');
    });

    it('should return a string: your weight is down', () => {
      //Arrange
      person.weight = 40
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('your weight is down');
    });

    it('should return a string: your weight is normal', () => {
      //Arrange
      person.weight = 58
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('your weight is normal');
    });

    it('should return a string: your you are overweight', () => {
      //Arrange
      person.weight = 75
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('you are overweight');
    });

    it('should return a string: your you are overweight level 1', () => {
      //Arrange
      person.weight = 85
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('you are overweight level 1');
    });

    it('should return a string: your you are overweight level 2', () => {
      //Arrange
      person.weight = 90
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('you are overweight level 2');
    });

    it('should return a string: your you are overweight level 3', () => {
      //Arrange
      person.weight = 120
      person.height = 1.73
      //Act
      const rta = person.calcIMC();
      //Assert
      expect(rta).toEqual('you are overweight level 3');
    });
  });
})
