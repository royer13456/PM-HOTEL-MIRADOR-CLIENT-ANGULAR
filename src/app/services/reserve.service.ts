import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/Reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  // API_URL = 'http://localhost:3000/api/reserve';
  // API_URL2 = 'http://localhost:3000/api/reserved';
  API_URL = 'https://pm-hotel-mirador-server-production.up.railway.app/api/reserve'
  API_URL2 = 'https://pm-hotel-mirador-server-production.up.railway.app/api/reserved'

  constructor(private http: HttpClient) {
  }

  getReservations() {
    // return this.http.get<Reservation[]>('http://localhost:3000/api/reserve');
    return this.http.get<Reservation[]>(this.API_URL);
  }

  createReserveRequest(reservation: Reservation) {
    return this.http.post<Reservation>(this.API_URL, reservation);
  }

  gerReservedDatesRequest() {
    return this.http.get(this.API_URL2);
  }

  getUser(dni: string) {
    return this.http.get(`https://dniruc.apisperu.com/api/v1/dni/${dni}?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6Impob29uYXRhbl8wOTEyQGhvdG1haWwuY29tIn0.HHXiCnWonVyFo-b0vvtEdGd16fii0KZWSucg6aFSW4A`);
  }

}
