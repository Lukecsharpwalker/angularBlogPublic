import { Component, Input, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-label',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './label.component.html',
  styleUrl: './label.component.scss',
})
export class LabelComponent {
  @Input() text: string = 'Label';
  @Input() color: string = '#000000';
}
