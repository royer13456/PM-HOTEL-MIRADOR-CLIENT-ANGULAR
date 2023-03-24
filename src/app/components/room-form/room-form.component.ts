import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.css']
})
export class RoomFormComponent implements OnInit {

  room: Room = {
    id: 0,
    image_url: "",
    title: "",
    description: "",
    price: 0,
    visible: true,
    created_at: new Date(),
  }

  edit: boolean = false;

  constructor(private roomService: RoomService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.roomService.getRoomRequest(id)
        .subscribe(
          (response: any) => {
            this.room = response[0];
            this.edit = true;
          }
        )
    }
  }

  createRoom() {
    delete this.room.id;
    delete this.room.created_at;

    this.roomService.createRoomRequest(this.room)
      .subscribe(
        (response) => {
          this.router.navigate(['/admin/list'])
        }
      )
  }

  updateRoom() {
    delete this.room.created_at;
    const id = this.room.id!;
    if (this.room.visible) {
      this.room.visible = 1
    } else {
      this.room.visible = 0
    }
    this.roomService.updateRoomRequest(id, this.room)
      .subscribe(
        (response) => {
          this.router.navigate(['/admin/list']);
        }
      )
  }


}
