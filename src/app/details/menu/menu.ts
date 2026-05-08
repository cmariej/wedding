import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  private jsonUrl = 'https://cmariej.github.io/wedding-data/menu.json';

  afternoon: MenuItem[] = [];
  dinner: MenuItem[] = [];
  snacks: MenuItem[] = [];
  drinks: MenuItem[] = [];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.http.get<MenuData>(this.jsonUrl).subscribe(data => {
      this.afternoon = [...data.afternoon];
      this.dinner = [...data.dinner];
      this.snacks = [...data.snacks];
      this.drinks = [...data.drinks];

      this.cdr.detectChanges();
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
