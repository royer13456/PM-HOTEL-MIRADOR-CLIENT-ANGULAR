import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { ContactMessage } from 'src/app/interface';
import { ContactService } from 'src/app/services/contact.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [CommonModule, ComponentsModule,FormsModule],
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

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
