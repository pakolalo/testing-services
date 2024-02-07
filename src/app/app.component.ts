import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Calculator } from './calculator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkWithHref],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'testing-services';

  ngOnInit(): void {
    const calculator = new Calculator()
    const rta = calculator.multiply(3,3);
    console.log('Multiplicación', rta);

    const rta2 = calculator.divide(3,0);
    console.log('División', rta2);


  }
}
