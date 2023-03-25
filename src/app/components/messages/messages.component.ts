import { Component, OnInit } from '@angular/core';
import { ContactMessage } from 'src/app/interface';
import { ContactService } from './../../services/contact.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messages: ContactMessage[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
    this.contactService.getMessagesRequest()
      .subscribe(
        (response) => {
          this.messages = response;
        }
      )
  }

}
