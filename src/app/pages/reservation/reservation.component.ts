import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Reservation, Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
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
    ReactiveFormsModule,
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

  public minDate: string;
  public date: Date = new Date();
  public reservesLenght: number = 0;

  private roomService = inject(RoomService);
  private activatedRoute = inject(ActivatedRoute);
  private reserveService = inject(ReserveService);

  constructor() {
    const currentDate = new Date();
    this.minDate = currentDate.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom() {
    const { id } = this.activatedRoute.snapshot.params
    this.roomService.getRoomRequest(id)
      .subscribe((response: any) => {
        this.room = response[0]
      })
  }

  reserve() {
    delete this.reserveRoom.id;

    if (this.reserveRoom.check_in_date &&
      this.reserveRoom.check_out_date &&
      this.reserveRoom.names &&
      this.reserveRoom.email) {

      /***********************************************/
      this.reserveService.getReservations()
        .subscribe((res: any) => {
          this.reservesLenght = res.lenght;
        });

      /***********************************************/
      this.generatePDF(
        `Nº 0000${this.reservesLenght + 1}`,
        this.reserveRoom.names,
        this.room.id,
        this.room.description,
        this.room.price,
      );
      /***********************************************/
      this.reserveRoom.code = `${this.room.id}-${this.reserveRoom.names}-${this.reserveRoom.total}`;
      this.reserveService.createReserveRequest(this.reserveRoom)
        .subscribe((res) => {
          console.table(this.reserveRoom)
        })
      /***********************************************/
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      /***********************************************/
    } else {
      alert("Completar todos los campos");
    }
  }

  generatePDF(
    codigoFactura: any,
    names: string,
    codigo: any,
    descripcion: string,
    valorUnitario: number,
    cantidad?: number,
    igv?: number,
    importeTotal?: number
  ) {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    var documentDefinition = {
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
              text: `NOTA DE VENTA ELECTRÓNICA\n${codigoFactura}`,
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
                { text: "Tipo y número de documento del cliente:", bold: true },
                { text: "" }
              ],
              [
                { text: "Nombre o razón social del cliente:", bold: true },
                { text: `${names}` }
              ],
              [
                { text: "Dirección del cliente:", bold: true },
                { text: "" }
              ]
            ]
          }
        },
        {
          layout: "lightHorizontalLines",
          margin: [0, 10],
          table: {
            headerRows: 1,
            widths: ["auto", "*", "auto", "auto"],
            body: [
              [
                { text: "Código", bold: true, alignment: "center" },
                { text: "Descripción", bold: true, alignment: "center" },
                { text: "Cantidad", bold: true, alignment: "center" },
                { text: "Valor unitario", bold: true, alignment: "center" },
              ],
              // repeat this row for each item
              [
                `${codigo}`,
                `${descripcion}`,
                {
                  text: `${cantidad}`, alignement: "center"
                },
                {
                  text: `${valorUnitario}`, alignement: "center"
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
                { text: `${igv}` }
              ],
              [
                { text: "Importe total", bold: true },
                { text: `S/${importeTotal}` }
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
