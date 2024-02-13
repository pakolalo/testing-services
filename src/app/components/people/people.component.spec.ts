import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleComponent } from './people.component';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';
import { By } from '@angular/platform-browser';

fdescribe('PeopleComponent', () => {
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
});
