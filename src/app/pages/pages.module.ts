import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RoomComponent } from './room/room.component';
import { DescriptionPipe } from '../description.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    DescriptionPipe,
    ContactUsComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    HomeComponent,
    RoomComponent,
    ContactUsComponent,
    AboutComponent
  ]
})
export class PagesModule { }
