import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  isLogged: boolean = false;


  constructor(private LSService: LocalstorageService) { }

  isLoggedIn(user: string, password: string): Observable<boolean> {

    return new Observable<boolean>(observer => {
      if (user === 'admin' && password === '123456' || this.LSService.get('admin')) {
        this.isLogged = true;
        observer.next(true);
        observer.complete();
      } else {
        this.isLogged = false;
        observer.next(false);
        observer.complete();
      }
    })
  }

  logout() {
    this.LSService.remove('admin')
    this.isLogged = false;
  }
}
