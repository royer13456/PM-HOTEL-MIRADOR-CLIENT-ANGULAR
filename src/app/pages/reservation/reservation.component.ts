import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { RoomService } from 'src/app/services/room.service';
import { FormsModule } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve.service';
import { PipesModule } from 'src/app/pipes/pipes.module';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { Room } from 'src/app/models/Room.model';
import { Reservation } from 'src/app/models/Reservation.model';


import { PDF } from 'src/app/models/PDF.model';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

@Component({
  selector: 'app-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NavbarComponent,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    PipesModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
  ],
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  dni: string = '';

  public room: Room = {
    id: 0,
    image_url: '',
    price: 0,
    title: '',
    description: '',
    category: '',
    visible: true,
    created_at: new Date(),
  }

  public reserveRoom: Reservation = {
    id: '',
    id_room: '',
    code: '',
    check_in_date: '',
    check_out_date: '',
    names: '',
    email: '',
    total: 0,
  }

  public minDate: Date = new Date;
  public date: Date = new Date();
  public reservesLength: number = 0;
  public reservedDates: Date[] = [];
  public pdf: PDF = { codeSalesNote: '', names: '', reserveCode: '', description: '', unitValue: 0, igv: 0, total: 0 };

  private roomService = inject(RoomService);
  private activatedRoute = inject(ActivatedRoute);
  private reserveService = inject(ReserveService);
  private router = inject(Router);


  constructor() { }

  ngOnInit(): void {
    const currentDate = new Date();
    this.minDate = currentDate;
    this.getRoom();
    this.getReservedDates();
    this.reserveService.getReservations()
      .subscribe(res => this.reservesLength = res.length);
  }

  getUser(dni: string) {
    this.reserveService.getUser(dni)
      .subscribe(
        (data: any) => {
          this.reserveRoom.names = `${data.apellidoPaterno} ${data.apellidoMaterno} ${data.nombres}`
        }
      );
  }

  getReservedDates() {
    this.reserveService.gerReservedDatesRequest().subscribe(
      (data: any) => {
        this.reservedDates = data.map((reservedDate: any) => {
          const startDate = new Date(reservedDate.check_in_date);
          const endDate = new Date(reservedDate.check_out_date);
          startDate.setHours(0, 0, 0, 0);
          endDate.setHours(0, 0, 0, 0);
          return { start: startDate, end: endDate };
        });
      }
    );
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) {
      return false;
    }
    const time = date.getTime();
    return !this.reservedDates.some((reservedDate: any) => {
      const start = reservedDate.start.getTime();
      const end = reservedDate.end.getTime();
      return start <= time && time <= end;
    });
  }

  getRoom() {
    const { id } = this.activatedRoute.snapshot.params
    this.roomService.getRoomRequest(id)
      .subscribe((response: any) => {
        this.room = response[0]
      })
  }

  reserve() {

    const formatedCheckIn = new Date(this.reserveRoom.check_in_date).toISOString().split('T')[0]
    const formatedCheckOut = new Date(this.reserveRoom.check_out_date).toISOString().split('T')[0]
    this.reserveRoom.check_in_date = formatedCheckIn;
    this.reserveRoom.check_out_date = formatedCheckOut;
    this.reserveRoom.id_room = this.room.id!;


    delete this.reserveRoom.id;
    if (!this.room.title) { this.router.navigate(['/']) }
    if (
      this.reserveRoom.check_in_date &&
      this.reserveRoom.check_out_date &&
      this.reserveRoom.names &&
      this.reserveRoom.email
    ) {


      this.pdf = {
        codeSalesNote: `Nº 0000${this.reservesLength + 1}`,
        names: this.reserveRoom.names,
        reserveCode: `R-${this.room.id}`,
        description: this.room.description,
        unitValue: this.room.price,
        igv: this.room.price * 0.18,
        total: (Number(this.room.price)) + (this.room.price * 0.18),
      }

      this.generatePDF(
        this.pdf
      );

      this.reserveRoom.code = `${this.room.id}-${this.reserveRoom.names}-${this.reserveRoom.total}`;
      this.reserveRoom.total = this.room.price
      this.reserveService.createReserveRequest(this.reserveRoom)
        .subscribe(console.log)

      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } else {
      alert('Completa todos los campos')
    }
  }

  generatePDF(pdf: PDF) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let documentDefinition = {
      content: [
        {
          columns: [
            {
              width: "*",
              text: "RUC: 20603942389",
              fontSize: 20,
              bold: true
            },
            {
              width: "*",
              text: `NOTA DE VENTA ELECTRÓNICA\n${pdf.codeSalesNote}`,
              fontSize: 20,
              bold: true,
              alignment: "right"
            }
          ]
        },
        {
          text: "HOSTAL MIRADOR TORRE TORRE",
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 0]
        },
        {
          text: "JR. TORRE TORRE NRO. 202 (A 1/2 CDRA DEL PARQUE CERRITO LA LIBERTAD)",
          fontSize: 12,
          margin: [0, 5, 0, 0]
        },
        {
          layout: "lightHorizontalLines",
          margin: [0, 10],
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                { text: "Fecha de emisión", bold: true },
                { text: `${this.date.toLocaleDateString()}` }
              ],
              [
                { text: "DNI", bold: true },
                { text: this.dni }
              ],
              [
                { text: "Nombre del cliente:", bold: true },
                { text: `${pdf.names}` }
              ],
            ]
          }
        },
        {
          layout: "lightHorizontalLines",
          margin: [0, 10],
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto"],
            body: [
              [
                { text: "Código", bold: true, alignment: "center" },
                { text: "Descripción", bold: true, alignment: "center" },
                { text: "Valor unitario", bold: true, alignment: "center" },
              ],
              // repeat this row for each item
              [
                `${pdf.reserveCode}`,
                `${pdf.description}`,
                {
                  text: `${pdf.unitValue}`, alignement: "center"
                },
              ]
            ]
          }
        },
        {
          layout: "lightHorizontalLines",
          margin: [0, 10],
          table: {
            headerRows: 1,
            widths: ["*", "auto"],
            body: [
              [
                { text: "Operaciones gravadas", bold: true },
                { text: "" }
              ],
              [
                { text: "IGV (18%)", bold: true },
                { text: `${pdf.igv.toFixed(2)}` }
              ],
              [
                { text: "Importe total", bold: true },
                { text: `S/${pdf.total.toFixed(2)}` }
              ]
            ]
          }
        },
      ],
      styles: {

      }
    };

    pdfMake.createPdf(documentDefinition).open();
    pdfMake.createPdf(documentDefinition).download('factura.pdf');
  }

}