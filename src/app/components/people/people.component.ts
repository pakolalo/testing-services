import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent, CommonModule],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {

  people: Person[] = [
    new Person('Isco', 'del Collado', 33, 1.73, 80),
    new Person('Valentina', 'Molina', 15, 1.54, 48),
  ];
  selectedPerson: Person | null = null;

  choose(person: Person) {
    this.selectedPerson = person;
  }
}
