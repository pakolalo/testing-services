import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonComponent } from './person.component';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Person } from '../../models/person.model';

fdescribe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Isco"', () => {
    component.person = new Person('Isco', 'del Collado', 33, 1.73, 67);
    expect(component.person.name).toEqual('Isco');
  })

  it('should have <h3> with "Hola, {person.name}"', () => {
    //Arrange
    component.person = new Person('Isco', 'del Collado', 33, 1.73, 67);
    const expectMsg = `Hola, ${component.person.name}`;
    const personDebug: DebugElement = fixture.debugElement;
    const h3Debug: DebugElement = personDebug.query(By.css('h3'));
    const h3Element: HTMLElement = h3Debug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3Element?.textContent).toEqual(expectMsg)
  })

  it('should have <p> with "Mi altura es {person.height}"',() => {
    //Arrange
    component.person = new Person('Isco', 'del Collado', 33, 1.73, 67);
    const personDebug: DebugElement = fixture.debugElement;
    const pDebug: DebugElement = personDebug.query(By.css('p'));
    const pElement: HTMLElement = pDebug.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(pElement?.textContent).toContain(component.person.height);
  });

  it('should display a text with IMC when call calcIMC', () => {
    //Arange
    component.person = new Person('Juan', 'Perez', 30, 1.65, 120); //overweight level 3
    const expectMsg = 'you are overweight level 3';
    const button = fixture.debugElement.query(By.css('button.btn-imc')).nativeElement;
    //Act
    component.calcIMC();
    fixture.detectChanges();
    //Assert
    expect(button.textContent).toContain(expectMsg);
  });

  it('should display a text with IMC when do click', () => {
    //Arange
    component.person = new Person('Juan', 'Perez', 30, 1.65, 120); //overweight level 3
    const expectMsg = 'you are overweight level 3';
    const buttonDebug = fixture.debugElement.query(By.css('button.btn-imc'));
    const buttonElement = buttonDebug.nativeElement;
    //Act
    buttonDebug.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(buttonElement.textContent).toContain(expectMsg);
  });

  it('should raise selected event when do click', () => {
    //Arrange
    const expecPerson = new Person('Juan', 'Perez', 30, 1.65, 120);
    component.person = expecPerson;
    const buttonDe = fixture.debugElement.query(By.css('button.btn-choose'));

    let selectedPerson: Person | undefined;
    component.onSelected
    .subscribe(person => {
      selectedPerson = person;
    });
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges()
    //Assert
    expect(selectedPerson).toEqual(expecPerson);
  });
});


@Component({
  template:`<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`,
})
class HostComponent {
  person = new Person('Santiago', 'Molina', 12, 1.5, 40);
  selectedPerson: Person | undefined;

  onSelected(person: Person) {
    this.selectedPerson = person;
  }
}

xdescribe('PersonComponent from HostComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display person name', () => {
    //Arrange
    const expectedName = component.person.name;
    const h3De = fixture.debugElement.query(By.css('app-person .h3'));
    const h3El = h3De.nativeElement;
    //Act
    fixture.detectChanges();
    //Assert
    expect(h3El.textContent).toContain(expectedName);
  })

  it('should raise selected event when clicked', () => {
    //Arrange
    const expectedName = component.person.name;
    const btnDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    btnDe.triggerEventHandler('click', null)
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.person);
  })
});

