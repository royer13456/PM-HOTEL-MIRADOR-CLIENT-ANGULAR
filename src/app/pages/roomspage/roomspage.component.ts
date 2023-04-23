import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';
import { RoomcardComponent } from 'src/app/components/client/roomcard/roomcard.component';
import { CardskeletonComponent } from 'src/app/shared/cardskeleton/cardskeleton.component';

@Component({
  selector: 'app-roomspage',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RoomcardComponent, CardskeletonComponent],
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
