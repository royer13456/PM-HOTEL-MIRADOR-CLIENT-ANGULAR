import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  API_URL = "http://localhost:3000/api/room"

  constructor(private http: HttpClient) { }

  getRoomsRequest() {
    return this.http.get<Room[]>(this.API_URL);
  }

  getRoomRequest(id: string) {
    return this.http.get<Room>(`${this.API_URL}/${id}`);
  }

  createRoomRequest(room: Room) {
    return this.http.post<Room>(this.API_URL, room)
  }

  updateRoomRequest(id: string | number, updatedRoom: Room) {
    return this.http.patch(`${this.API_URL}/${id}`, updatedRoom);
  }
}
