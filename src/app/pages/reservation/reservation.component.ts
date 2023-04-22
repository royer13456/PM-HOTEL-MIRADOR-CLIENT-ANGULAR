import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Reservation, Room } from 'src/app/interface';
import { RoomService } from 'src/app/services/room.service';
import { ActivatedRoute } from '@angular/router';
import { ReserveService } from 'src/app/services/reserve.service';
import { PipesModule } from 'src/app/pipes/pipes.module';
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
    MatCheckboxModule,
    MatCardModule,
    MatDatepickerModule,
    ReactiveFormsModule,    
    PipesModule,
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
    id: 0,
    code: "",
    from: "",
    to: "",
    n_rooms: 1,
    names: "",
    email: "",
    phone: "",
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

  increment() {
    if (this.reserveRoom.n_rooms >= 20) {
      this.reserveRoom.n_rooms = 20
    } else {
      this.reserveRoom.n_rooms++
    }
  }

  decrement() {
    if (this.reserveRoom.n_rooms <= 1) {
      this.reserveRoom.n_rooms = 1
    } else {
      this.reserveRoom.n_rooms--
    }
  }

  reserve() {
    delete this.reserveRoom.id;
    if (this.reserveRoom.from &&
      this.reserveRoom.to &&
      this.reserveRoom.names &&
      this.reserveRoom.email &&
      this.reserveRoom.phone) {
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
        this.reserveRoom.n_rooms,
        this.room.price,
        (this.room.price * this.reserveRoom.n_rooms) * 0.18,
        (this.room.price * this.reserveRoom.n_rooms) + (this.room.price * this.reserveRoom.n_rooms) * 0.18
      );
      /***********************************************/
      this.reserveRoom.total = (this.room.price * this.reserveRoom.n_rooms) + (this.room.price * this.reserveRoom.n_rooms) * 0.18;;
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
    cantidad: number,
    valorUnitario: number,
    igv: number,
    importeTotal: number,
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
