import { Component } from '@angular/core';
import data from './menu.json';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  afternoon = data.afternoon;
  dinner = data.dinner;
  snacks = data.snacks;
  drinks = data.drinks;
}
