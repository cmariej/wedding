import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse } from 'yaml';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

interface MenuItem {
  name: string;
  tags?: string[];
}

interface MenuData {
  afternoon: MenuItem[];
  dinner: MenuItem[];
  snacks: MenuItem[];
  drinks: MenuItem[];
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatProgressSpinnerModule, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private url = 'https://cmariej.github.io/wedding-data/menu.yaml?t=' + Date.now();

  afternoon: MenuItem[] = [];
  dinner: MenuItem[] = [];
  snacks: MenuItem[] = [];
  drinks: MenuItem[] = [];
  loading = false;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  loadMenu() {
    this.loading = true;

    this.http
      .get<any[]>(`${environment.apiUrl}/projects/Hochzeit/menue`)
      .subscribe({
        next: data => {

          this.afternoon = data.filter(item => item.category === 'afternoon');

          this.dinner = data.filter(item => item.category === 'dinner');

          this.snacks = data.filter(item => item.category === 'snacks');

          this.drinks = data.filter(item => item.category === 'drinks');

          this.loading = false;

          this.cdr.detectChanges();
        },

        error: err => {
          console.error(err);
          this.loading = false;
        }
      });
  }

  hasTag(item: MenuItem, tag: string): boolean {
    return (item.tags ?? []).includes(tag);
  }

  getDisplayName(item: MenuItem): string {
    const tagMap: Record<string, string> = {
      vegan: '🌱',
      vegetarisch: '🥕',
      glutenfrei: '🌾'
    };
    const icons = (item.tags ?? []).map(tag => tagMap[tag] ?? '').join('');
    return item.name + '\u00A0\u00A0\u00A0' + icons;
  }
}
