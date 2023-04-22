import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CardformComponent } from '../cardform/cardform.component';

@Component({
  selector: 'app-roomform',
  standalone: true,
  imports: [CommonModule,FormsModule,MatFormFieldModule,MatSelectModule,CardformComponent],
  templateUrl: './roomform.component.html',
  styleUrls: ['./roomform.component.css']
})
export class RoomformComponent implements OnInit {

  public room: Room = {
    id: 0,
    image_url: "",
    title: "",
    description: "",
    category: "",
    price: 0,
    visible: true,
    created_at: new Date(),
  }

  public categories: string[] = ["Estándar", "Doble ejecutivo", "Tripe ejecutivo"];

  public edit: boolean = false;

  public id: number = 0;

  private roomService = inject(RoomService);

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  constructor() { }


  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    this.id = id;

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
          this.router.navigate(['/admin/list']);
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
