import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeopleComponent, PersonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list app-person components', () => {
    //Arrange
    component.people = [
      new Person('Isco', 'del Collado', 33, 1.73, 80),
      new Person('Valentina', 'Molina', 15, 1.54, 48),
      new Person('Santiago', 'Perez', 24, 1.80, 85),
    ];
        //Act
    fixture.detectChanges()
    const debugEl = fixture.debugElement.queryAll(By.css('app-person'));
    //Assert
    expect(debugEl.length).toEqual(3)
  });

  it('should raise selected event when clicked', () => {
    //Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
  });

  it('should render the selected person', () => {
    //Arrange
    const buttonDe = fixture.debugElement.query(By.css('app-person .btn-choose'));
    //Act
    buttonDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    const liDe = fixture.debugElement.query(By.css('.selectedPerson ul > li'));
    //Assert
    expect(component.selectedPerson).toEqual(component.people[0]);
    expect(liDe.nativeElement.textContent).toContain(component.selectedPerson?.name);
  });
});
