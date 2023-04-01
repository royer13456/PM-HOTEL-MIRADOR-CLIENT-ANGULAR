import { Component, OnInit } from '@angular/core';
import { RoomService } from './../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interface';
import { Reservation } from 'src/app/interface';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  room: Room = {
    id: 0,
    image_url: '',
    price: 0,
    title: '',
    description: '',
    category: '',
    visible: true,
    created_at: new Date(),
  }

  reserveRoom: Reservation = {
    id: 0,
    code: "",
    from: "",
    to: "",
    n_rooms: 1,
    names: "",
    email: "",
    phone: "",
    total: 0,
  }

  minDate: string;

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute) {
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom() {
    const { id } = this.activatedRoute.snapshot.params
    this.roomService.getRoomRequest(id)
      .subscribe((response: any) => {
        this.room = response[0]
      })
  }

  increment() {
    if (this.reserveRoom.n_rooms >= 20) {
      this.reserveRoom.n_rooms = 20
    } else {
      this.reserveRoom.n_rooms++
    }
  }
  decrement() {
    if (this.reserveRoom.n_rooms <= 1) {
      this.reserveRoom.n_rooms = 1
    } else {
      this.reserveRoom.n_rooms--
    }
  }
  reserve() {
    if (this.reserveRoom.from &&
      this.reserveRoom.to &&
      this.reserveRoom.names &&
      this.reserveRoom.email &&
      this.reserveRoom.phone) {
      // Realizar acciones en caso de que todos los campos estén completos
      console.table(this.reserveRoom);
    } else {
      // Mostrar mensaje de error o realizar acciones en caso de que falten campos
      alert("Completar todos los campos");
    }
  }

}
