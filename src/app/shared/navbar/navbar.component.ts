import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
  inject,
  HostListener,
  signal,
  WritableSignal,
  viewChild,
  AfterViewInit,
  afterNextRender,
  ElementRef,
} from '@angular/core';
import { DynamicDialogService } from '../dynamic-dialog/dynamic-dialog.service';
import { LoginCompontent } from '../../auth/login/login.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-navbar',
  standalone: true,
  imports: [RouterLink],
  providers: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements AfterViewInit {
  public navbar = viewChild<ElementRef<HTMLElement>>('navbar');
  public mobileMenu = viewChild<ElementRef<HTMLElement>>('mobileMenu');
  public isScrolled = false;
  public isMenuOpen: WritableSignal<boolean> = signal(false);
  public navHeight: WritableSignal<number> = signal(0);

  private dynamicDialogService = inject(DynamicDialogService);
  private viewContainerRef = inject(ViewContainerRef);

  constructor() {
    afterNextRender(() => {
      this.navHeight.set(this.navbar()?.nativeElement.scrollHeight ?? 0);
    });
  }

  ngAfterViewInit() {}

  signIn() {
    this.dynamicDialogService.openDialog<LoginCompontent>(
      this.viewContainerRef,
      { title: 'Sign In' },
      LoginCompontent,
    );
  }

  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());

    if (this.isMenuOpen()) {
      setTimeout(() => {
        console.log(this.mobileMenu()?.nativeElement);
        this.mobileMenu()?.nativeElement.style.setProperty(
          'top',
          `${this.navHeight()}px`,
        );
      }, 1);
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }
}
