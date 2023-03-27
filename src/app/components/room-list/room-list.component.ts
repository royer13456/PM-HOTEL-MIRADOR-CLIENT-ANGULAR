import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.css']
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = []

  pageSizeOptions: number[] = [8, 20, 50];

  paginationInfo = {
    currentPage: 1,
    itemsPerPage: this.pageSizeOptions[0],
    totalItems: 0,
    totalPages: 0,
  };

  enabledRooms: Room[] = [];

  disabledRooms: Room[] = [];

  constructor(private roomService: RoomService) { }

  ngOnInit(): void {
    this.loadRooms();
    // this.loadRoomsWithPagination()    
  }

  loadRooms() {
    this.roomService.getRoomsRequest().
      subscribe(response => {
        this.rooms = response;
        this.filterRooms()
      })
  }

  loadRoomsWithPagination(page: number = 1, itemsPerPage: number = this.paginationInfo.itemsPerPage) {
    this.roomService.getRoomsRequest()
      .subscribe((response) => {
        this.paginationInfo.totalItems = response.length;
        this.paginationInfo.totalPages = Math.ceil(response.length / itemsPerPage);
        this.paginationInfo.itemsPerPage = itemsPerPage;
        this.paginationInfo.currentPage = page;

        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        this.rooms = response.slice(startIndex, endIndex)
      });
  }

  filterRooms() {
    this.enabledRooms = this.rooms.filter(room => room.visible);
    this.disabledRooms = this.rooms.filter(room => !room.visible);
  }


}
