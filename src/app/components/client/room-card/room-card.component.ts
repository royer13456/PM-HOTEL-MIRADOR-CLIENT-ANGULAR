import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/interface';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input() room: Room = {
    id: 0,
    image_url: '',
    title: '',
    category: '',
    description: '',
    price: 0,
    visible: true,
    created_at: new Date(),
  }


  constructor() { }

  ngOnInit(): void {
  }

}
