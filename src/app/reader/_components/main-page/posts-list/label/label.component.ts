import {Component, Input} from '@angular/core';
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss'
})
export class LabelComponent {
  @Input() text: string = 'Label';
  @Input() position: number = 0; // Position to control vertical spacing
  @Input() color: string = '#000000';
}
