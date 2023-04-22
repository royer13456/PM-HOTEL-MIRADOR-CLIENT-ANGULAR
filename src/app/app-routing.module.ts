import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// GUARD
import { AdminGuard } from './pages/auth/adminhome/admin.guard';


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
    path: 'admin', loadComponent: () => import('./pages/auth/adminhome/adminhome.component').then(m => m.AdminhomeComponent), canActivate: [AdminGuard], children: [
      {
        path: '', loadComponent: () => import('./components/admin/main/main.component').then(m => m.MainComponent), canActivate: [AdminGuard]
      },
      {
        path: 'list', loadComponent: () => import('./components/admin/roomslist/roomslist.component').then(m => m.RoomslistComponent), canActivate: [AdminGuard]
      },
      {
        path: 'new', loadComponent: () => import('./components/admin/roomform/roomform.component').then(m => m.RoomformComponent), canActivate: [AdminGuard]
      },
      {
        path: 'messages', loadComponent: () => import('./components/messageslist/messageslist.component').then(m => m.MessageslistComponent), canActivate: [AdminGuard]
      },
      {
        path: 'edit/:id', loadComponent: () => import('./components/admin/roomform/roomform.component').then(m => m.RoomformComponent), canActivate: [AdminGuard]
      },
    ]
  },
  {
    path: 'login', loadComponent: () => import('./pages/auth/loginadmin/loginadmin.component').then(m => m.LoginadminComponent)
  },
  {
    path: 'reservation/:id', loadComponent: () => import('./pages/reservation/reservation.component').then(m => m.ReservationComponent)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
