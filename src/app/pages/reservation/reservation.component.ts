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
    description: '',
    price: 0,
    title: '',
    visible: true,
    created_at: new Date(),
  }

  reserveRoom: Reservation = {
    id: 0,
    code: "",
    from: "",
    to: "",
    n_rooms: 0,
    names: "",
    email: "",
    phone: "",
    total: 0,

  }

  number: number = 0;

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
    if (this.number >= 20) {
      this.number = 20
    } else {
      this.number++
    }
  }
  decrement() {
    if (this.number <= 1) {
      this.number = 0
    } else {
      this.number--
    }
  }
  reserve() {
    console.log(this.room)
  }
}
