import { Component, OnInit } from '@angular/core';
import { RoomService } from './../../services/room.service';
import { Room } from './../../interface/index';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  roomList: Room[] = [];

  descriptions: string[] = []

  // "Estándar", "Doble ejecutivo", "Tripe ejecutivo"
  estandarRooms: Room[] = [];

  dobleRooms: Room[] = [];

  tripleRooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRoomsRequest()
      .subscribe(res => {
        this.roomList = res;
        this.estandarRooms = this.roomList.filter(room => room.category === "Estándar");
        this.dobleRooms = this.roomList.filter(room => room.category === "Doble ejecutivo");
        this.tripleRooms = this.roomList.filter(room => room.category === "Tripe ejecutivo");
      })
  }



}
