import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RouterModule } from '@angular/router';
import { RoomFormComponent } from './room-form/room-form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    AdminMainComponent,
    RoomFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    AdminMainComponent,
    RoomFormComponent
  ]
})
export class ComponentsModule { }
