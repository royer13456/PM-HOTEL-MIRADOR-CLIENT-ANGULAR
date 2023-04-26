import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactService } from 'src/app/services/contact.service';
import { ContactMessage } from 'src/app/models/ContactMessage.model';

@Component({
  selector: 'app-messageslist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './messageslist.component.html',
  styleUrls: ['./messageslist.component.css']
})
export class MessageslistComponent implements OnInit {


  public messages: ContactMessage[] = [];

  private contactService = inject(ContactService);

  constructor() { }

  ngOnInit(): void {
    this.contactService.getMessagesRequest()
      .subscribe(
        (response) => {
          this.messages = response;
        }
      )
  }
}
