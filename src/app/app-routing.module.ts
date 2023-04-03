import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { RoomListComponent } from './components/room-list/room-list.component';
import { AdminMainComponent } from './components/admin-main/admin-main.component';
import { RoomFormComponent } from './components/room-form/room-form.component';
import { MessagesComponent } from './components/messages/messages.component';

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
  {
    path: 'gallery', component: GalleryComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
