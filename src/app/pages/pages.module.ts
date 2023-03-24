import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { RoomComponent } from './room/room.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from '../app-routing.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  declarations: [
    HomeComponent,
    RoomComponent,
    ContactUsComponent,
    AboutComponent,
    AdminComponent,
    LoginAdminComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    AppRoutingModule,
    PipesModule
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
