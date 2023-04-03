import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactMessage } from 'src/app/interface';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  message: ContactMessage = {
    id: 0,
    names: "",
    correo: "",
    celular: "",
    message: "",
  }

  constructor(private messageService: ContactService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  createMessage() {
    delete this.message.id;

    this.messageService.createMessageRequest(this.message)
      .subscribe(
        (response) => {
          this.router.navigate(['/admin/message'])
        }
      )
  }



}