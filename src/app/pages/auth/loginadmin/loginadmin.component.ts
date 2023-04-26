import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Admin } from 'src/app/models/Admin.model';

@Component({
  selector: 'app-loginadmin',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './loginadmin.component.html',
  styleUrls: ['./loginadmin.component.css']
})
export class LoginadminComponent implements OnInit {

  private adminService = inject(AdminService);

  private router = inject(Router);

  private LSService = inject(LocalstorageService);

  constructor() { }

  admin: Admin = { user: '', password: '' };

  ngOnInit(): void {
  }

  login() {
    const { user, password } = this.admin;
    this.adminService.isLoggedIn(user, password)
      .subscribe(response => {
        if (response === true) {
          const token = 'd404559f602eab6fd602ac7680dacbfaadd13630335e951f097af3900e9de176b6db28512f2e000b9d04fba5133e8b1c6e8df59db3a8ab9d60be4b97cc9e81db';
          this.LSService.set('admin', token);
          this.adminService.isLogged = true;
          this.router.navigate(['/admin']);
          window.history.replaceState({}, '', '/admin');
        } else {
          console.error("Error");
        }
      });
  }
}
