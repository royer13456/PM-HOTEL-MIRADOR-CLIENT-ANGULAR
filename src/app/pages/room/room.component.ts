import { Component, OnInit, inject } from '@angular/core';
import { RoomService } from './../../services/room.service';
import { Room } from './../../interface/index';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  public roomList: Room[] = [];

  public descriptions: string[] = []

  public estandarRooms: Room[] = [];

  public dobleRooms: Room[] = [];

  public tripleRooms: Room[] = [];

  private roomService = inject(RoomService)

  constructor() { }

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
