import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/services/localstorage.service';
import { Admin } from 'src/app/interface';


@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  constructor(private adminService: AdminService, private router: Router, private LSService: LocalstorageService) { }

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
      })
  }
}
