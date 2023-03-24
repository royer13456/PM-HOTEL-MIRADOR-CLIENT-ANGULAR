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

  getRoomRequest(id: string) {
    return this.http.get<Room>(`http://localhost:3000/api/room/${id}`);
  }

  createRoomRequest(room: Room) {
    return this.http.post<Room>('http://localhost:3000/api/room', room)
  }

  updateRoomRequest(id: string | number, updatedRoom: Room) {
    return this.http.patch(`http://localhost:3000/api/room/${id}`, updatedRoom);
  }
}
