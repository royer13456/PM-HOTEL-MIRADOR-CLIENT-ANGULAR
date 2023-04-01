import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from './room-card/room-card.component';
import { DescriptionPipe } from 'src/app/pipes/description.pipe';
import { RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    RoomCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    RoomCardComponent
  ]
})
export class ClientModule { }
