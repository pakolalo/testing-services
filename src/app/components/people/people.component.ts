import { Component } from '@angular/core';
import { PersonComponent } from '../person/person.component';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-people',
  standalone: true,
  imports: [PersonComponent,],
  templateUrl: './people.component.html',
  styleUrl: './people.component.css'
})
export class PeopleComponent {

  person: Person = new Person('Isco', 'del Collado', 33, 1.73, 80);

}
