import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reservation } from 'src/app/models/Reservation.model';
import { ReserveService } from 'src/app/services/reserve.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reserves-list',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './reserves-list.component.html',
  styleUrls: ['./reserves-list.component.css']
})
export class ReservesListComponent implements OnInit {

  reservesList: Reservation[] = [];

  constructor(private reserveService: ReserveService) { }

  ngOnInit(): void {
    this.reserveService.getReservations()
      .subscribe(
        reserves => {
          this.reservesList = reserves;
        }
      )
  }

}
