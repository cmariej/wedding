import { Component, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-countdown',
  imports: [],
  templateUrl: './countdown.html',
  styleUrl: './countdown.scss',
})
export class Countdown implements OnInit, OnDestroy {

  days    = signal('000');
  hours   = signal('00');
  minutes = signal('00');
  seconds = signal('00');

  private target: Date = new Date('2027-07-17T11:00:00');
  private interval: any;

  ngOnInit(): void {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private update(): void {
    const diff = this.target.getTime() - new Date().getTime();

    if (diff <= 0) {
      this.days.set('000');
      this.hours.set('00');
      this.minutes.set('00');
      this.seconds.set('00');
      return;
    }

    this.days.set(String(Math.floor(diff / 86400000)).padStart(3, '0'));
    this.hours.set(String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0'));
    this.minutes.set(String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'));
    this.seconds.set(String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'));
  }
}