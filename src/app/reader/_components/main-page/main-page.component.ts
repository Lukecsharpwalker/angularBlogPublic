import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { NgClass } from '@angular/common';
import { AboutMeComponent } from '../../../shared/about-me/about-me.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainPageComponent {}
