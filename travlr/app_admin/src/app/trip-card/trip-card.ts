import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-card',
  imports: [CurrencyPipe],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css',
})
export class TripCard {
  @Input() trip!: Trip;

  constructor(
    private router: Router,
    private authenticationService: Authentication
  ) { }

  public editTrip(): void {
    localStorage.setItem('tripCode', this.trip.code);
    this.router.navigate(['edit-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}