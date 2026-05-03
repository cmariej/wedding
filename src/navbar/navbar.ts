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

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.dropdownOpen = false;
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.menuOpen = false;
      this.dropdownOpen = false;
    });
  }

  toggleDropdown(event: Event): void {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
    this.dropdownOpen = false;
  }
}
