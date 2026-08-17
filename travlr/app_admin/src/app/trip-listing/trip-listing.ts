import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripData } from '../services/trip-data';
import { TripCard } from '../trip-card/trip-card';
import { Authentication } from '../services/authentication';

@Component({
  selector: 'app-trip-listing',
  imports: [TripCard],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css',
  providers: [TripData]
})
export class TripListing implements OnInit {
  trips = signal<Trip[]>([]);

  constructor(
    private tripDataService: TripData,
    private router: Router,
    private authenticationService: Authentication
  ) {
    console.log('trip-listing constructor');
  }

  ngOnInit(): void {
    this.tripDataService.getTrips().subscribe({
      next: (value: Trip[]) => {
        this.trips.set(value);
        console.log('trips received:', value);
      },
      error: (error: any) => {
        console.log(error as any);
      }
    });
  }

  public addTrip(): void {
    this.router.navigate(['add-trip']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}