import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Reservation } from 'src/app/interface';

@Injectable({
  providedIn: 'root'
})
export class ReserveService {

  constructor(private http: HttpClient) {
  }

  getReservations() {
    return this.http.get<Reservation[]>('http://localhost:3000/api/reserve');
  }

  createReserveRequest(reservation: Reservation) {
    return this.http.post<Reservation>('http://localhost:3000/api/reserve', reservation);
  }

  gerReservedDatesRequest(){
    return this.http.get('http://localhost:3000/api/reserved');
  }
}
