import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AdminMainComponent } from './admin-main/admin-main.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    AdminMainComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    AdminMainComponent
  ]
})
export class ComponentsModule { }
