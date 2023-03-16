import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './pages/room/room.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './pages/admin/admin.guard';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';

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
    path: 'admin', component: AdminComponent, canActivate: [AdminGuard]
  },
  {
    path: 'login', component: LoginAdminComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
