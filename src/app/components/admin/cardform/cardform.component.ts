import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { Room } from 'src/app/models/Room.model';

@Component({
  selector: 'app-cardform',
  standalone: true,
  imports: [CommonModule, PipesModule, MatCardModule, MatListModule],
  templateUrl: './cardform.component.html',
  styleUrls: ['./cardform.component.css']
})

export class CardformComponent implements OnInit {

  @Input() room: Room = {
    id: 0,
    image_url: '',
    title: '',
    description: '',
    category: '',
    price: 0,
    visible: true,
    created_at: new Date(),
  };

  constructor() { }

  ngOnInit(): void {
  }

}
