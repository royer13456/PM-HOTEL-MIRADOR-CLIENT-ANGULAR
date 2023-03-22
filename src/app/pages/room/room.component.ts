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

  constructor(private roomService: RoomService) { }

  ngOnInit() {
    this.roomService.getRoomsRequest()
      .subscribe(res => {
        this.roomList = res;
      })
  }



}
