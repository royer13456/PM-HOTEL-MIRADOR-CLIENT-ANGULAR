import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { CardformComponent } from '../cardform/cardform.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { Room } from 'src/app/models/Room.model';

@Component({
  selector: 'app-roomform',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    CardformComponent
  ],
  templateUrl: './roomform.component.html',
  styleUrls: ['./roomform.component.css'],
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
