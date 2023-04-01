import { Component, Input, OnInit } from '@angular/core';
import { Room } from 'src/app/interface';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.css']
})
export class FormCardComponent implements OnInit {

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
