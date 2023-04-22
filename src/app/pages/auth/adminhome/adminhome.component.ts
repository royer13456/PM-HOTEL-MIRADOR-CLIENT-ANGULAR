import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from 'src/app/services/admin.service';
import { Router, RouterModule } from '@angular/router';
import { PipesModule } from 'src/app/pipes/pipes.module';

@Component({
  selector: 'app-adminhome',
  standalone: true,
  imports: [CommonModule,RouterModule,PipesModule],
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent {

  private adminService = inject(AdminService);

  private router = inject(Router);

  constructor() { }

  logOut() {
    this.adminService.logout()
    this.router.navigate(['/'])
  }

}
