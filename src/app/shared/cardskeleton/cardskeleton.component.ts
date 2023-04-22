import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cardskeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cardskeleton.component.html',
  styleUrls: ['./cardskeleton.component.css']
})
export class CardskeletonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
