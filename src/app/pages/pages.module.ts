import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RoomComponent } from './room/room.component';
import { DescriptionPipe } from '../description.pipe';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { FormsModule } from "@angular/forms";



@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    DescriptionPipe,
    ContactUsComponent,
    AboutComponent,
    AdminComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule

  ],
  exports: [
    HomeComponent,
    RoomComponent,
    ContactUsComponent,
    AboutComponent,
    AdminComponent,
    LoginAdminComponent
  ]
})
export class PagesModule { }
