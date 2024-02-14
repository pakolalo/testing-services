import { Component } from '@angular/core';
import { HighlightDirective } from '../../directives/highlight.directive';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-others',
  standalone: true,
  imports: [HighlightDirective, CommonModule, FormsModule],
  templateUrl: './others.component.html',
  styleUrl: './others.component.css'
})
export class OthersComponent {

  color= 'blue';

}
