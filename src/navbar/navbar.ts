import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  router = inject(Router);
  dropdownOpen = false;
  menuOpen = false;
  isMobile = false;
   private hoverTimeout: any;

  constructor() {
    this.checkMobile();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuOpen = false;
      this.dropdownOpen = false;
    });
  }

  @HostListener('window:resize')
  checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
  }

  onDesktopEnter(): void {
    if (!this.isMobile) {
      this.dropdownOpen = true;
    }
  }

  onDesktopLeave(): void {
    if (!this.isMobile) {
      this.dropdownOpen = false;
    }
  }

  isDetailsActive(): boolean {
    return this.router.url.startsWith('/details');
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.dropdownOpen = false;
  }
}