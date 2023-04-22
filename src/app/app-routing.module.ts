import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { MessagesComponent } from './components/messages/messages.component';
import { ReservationComponent } from './pages/reservation/reservation.component';


const routes: Routes = [
  {
    path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'habitaciones', loadComponent: () => import('./pages/roomspage/roomspage.component').then(m => m.RoomspageComponent)
  },
  {
    path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'gallery', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'contacto', loadComponent: () => import('./pages/contactus/contactus.component').then(m => m.ContactusComponent)
  },
  {
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard], children: [
      {
        path: '', component: AdminMainComponent, canActivate: [AdminGuard]
      },
      {
        path: 'list', component: RoomListComponent, canActivate: [AdminGuard]
      },
      {
        path: 'new', component: RoomFormComponent, canActivate: [AdminGuard]
      },
      {
        path: 'messages', component: MessagesComponent, canActivate: [AdminGuard]
      },
      {
        path: 'edit/:id', component: RoomFormComponent, canActivate: [AdminGuard]
      },
    ]
  },
  {
    path: 'login', component: LoginAdminComponent
  },
  {
    path: 'reservation/:id', component: ReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
