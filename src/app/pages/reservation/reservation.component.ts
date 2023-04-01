import { Component, OnInit } from '@angular/core';
import { RoomService } from './../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room, Reservation } from 'src/app/interface';

const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  room: Room = {
    id: 0,
    image_url: '',
    price: 0,
    title: '',
    description: '',
    category: '',
    visible: true,
    created_at: new Date(),
  }

  reserveRoom: Reservation = {
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

  minDate: string;

  date: Date = new Date();

  constructor(private roomService: RoomService, private activatedRoute: ActivatedRoute) {
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
    if (this.reserveRoom.from &&
      this.reserveRoom.to &&
      this.reserveRoom.names &&
      this.reserveRoom.email &&
      this.reserveRoom.phone) {
      // Realizar acciones en caso de que todos los campos estén completos
      this.generatePDF(
        this.reserveRoom.names,
        this.room.id,
        this.room.description,
        this.reserveRoom.n_rooms,
        this.room.price,
        (this.room.price * this.reserveRoom.n_rooms) * 0.18,
        (this.room.price * this.reserveRoom.n_rooms)+(this.room.price * this.reserveRoom.n_rooms) * 0.18
      );
    } else {
      // Mostrar mensaje de error o realizar acciones en caso de que falten campos
      alert("Completar todos los campos");
    }
  }

  generatePDF(
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
              text: "FACTURA ELECTRÓNICA\nFHTT-000001",
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
  }

}
