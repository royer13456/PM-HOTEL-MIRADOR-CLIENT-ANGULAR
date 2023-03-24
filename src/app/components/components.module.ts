import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RoomListComponent } from './room-list/room-list.component';
import { AdminMainComponent } from './admin-main/admin-main.component';
import { RoomFormComponent } from './room-form/room-form.component';

// ANGULAR MATERIAL
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
// ANGULAR MATERIAL




@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    RoomListComponent,
    AdminMainComponent,
    RoomFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
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
