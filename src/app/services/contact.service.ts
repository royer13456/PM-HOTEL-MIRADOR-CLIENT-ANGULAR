import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMessage } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getMessagesRequest() {
    return this.http.get<ContactMessage[]>('http://localhost:3000/api/contact');
  }

  createMessage(message: ContactMessage) {
    return this.http.post(`http://localhost:3000/api/contact`, message);
  }
}
