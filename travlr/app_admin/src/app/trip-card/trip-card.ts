import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  imports: [CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip!: Trip;

  constructor(private router: Router) { }

  public editTrip(): void {
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigate(['edit-trip']);
  }
}