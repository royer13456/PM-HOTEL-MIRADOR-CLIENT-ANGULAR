import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { RouterModule } from '@angular/router';
import { Room } from 'src/app/models/Room.model';

@Component({
  selector: 'app-roomcard',
  standalone: true,
  imports: [CommonModule,PipesModule,RouterModule],
  templateUrl: './roomcard.component.html',
  styleUrls: ['./roomcard.component.css']
})
export class RoomcardComponent implements OnInit {

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
