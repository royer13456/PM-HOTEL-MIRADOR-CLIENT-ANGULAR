import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactMessage } from '../models/ContactMessage.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  // API_URL = "http://localhost:3000/api/contact";
  API_URL = 'https://pm-hotel-mirador-server-production.up.railway.app/api/contact'


  constructor(private http: HttpClient) { }

  getMessagesRequest() {
    return this.http.get<ContactMessage[]>(this.API_URL);
  }

  createMessageRequest(message: ContactMessage) {
    return this.http.post(this.API_URL, message);
  }
}