import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ContactMessage } from 'src/app/interface';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  public message: ContactMessage = {
    id: 0,
    names: "",
    correo: "",
    celular: "",
    message: "",
  }

  private messageService = inject(ContactService);
  private router = inject(Router);

  constructor() { }

  createMessage() {
    delete this.message.id;
    if (!this.message.names &&
      !this.message.correo &&
      !this.message.celular) {
      console.log("error")
    } else {
      this.messageService.createMessageRequest(this.message)
        .subscribe(res => this.router.navigate(['/']))
    }
  }



}