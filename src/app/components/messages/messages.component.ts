import { Component, OnInit, inject } from '@angular/core';
import { ContactMessage } from 'src/app/interface';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

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
