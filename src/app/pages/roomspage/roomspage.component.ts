import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-roomspage',
  standalone: true,
  imports: [CommonModule,ComponentsModule],
  templateUrl: './roomspage.component.html',
  styleUrls: ['./roomspage.component.css']
})
export class RoomspageComponent implements OnInit {


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
