import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  constructor(private http: HttpClient) { }

  getRoomsRequest() {
    return this.http.get<Room[]>('http://localhost:3000/api/room');
  }
}
