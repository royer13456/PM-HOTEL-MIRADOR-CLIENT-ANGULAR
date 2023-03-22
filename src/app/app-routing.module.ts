import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'habitaciones', component: RoomComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'contacto', component: ContactUsComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
