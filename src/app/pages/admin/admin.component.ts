import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  private adminService = inject(AdminService);

  private router = inject(Router);

  constructor() { }

  logOut() {
    this.adminService.logout()
    this.router.navigate(['/'])
  }
}
