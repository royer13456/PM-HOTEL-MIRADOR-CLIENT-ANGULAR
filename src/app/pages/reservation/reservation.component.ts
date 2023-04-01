import { Component, OnInit } from '@angular/core';
import { RoomService } from './../../services/room.service';
import { ActivatedRoute } from '@angular/router';
import { Room } from 'src/app/interface';
import { Reservation } from 'src/app/interface';

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
      this.generatePDF();
    } else {
      // Mostrar mensaje de error o realizar acciones en caso de que falten campos
      alert("Completar todos los campos");
    }
  }

  generatePDF() {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const documentDefinition = {
      content: [
        {
          columns: [
            {
              text: 'Razón Social: Nombre de la empresa',
              style: 'header'
            },
            {
              text: 'RUC: 12345678901',
              style: 'header',
              alignment: 'right'
            }
          ]
        },
        {
          text: 'FACTURA ELECTRÓNICA',
          style: 'invoiceTitle',
          alignment: 'center'
        },
        {
          columns: [
            {
              text: 'F001-00000001',
              style: 'invoiceNumber',
              alignment: 'right'
            }
          ]
        },
        {
          text: 'Fecha de Emisión: 01/01/2022',
          style: 'invoiceSubheader'
        },
        {
          text: 'Señor(es): Nombre del cliente',
          style: 'invoiceSubheader'
        },
        {
          text: 'Dirección: Dirección del cliente',
          style: 'invoiceSubheader'
        },
        {
          text: 'RUC/DNI: 12345678901',
          style: 'invoiceSubheader'
        },
        {
          style: 'tableExample',
          table: {
            widths: ['auto', '*', 'auto', 'auto', 'auto'],
            body: [
              ['Código', 'Descripción', 'Cantidad', 'P. Unitario', 'Importe'],
              ['001', 'Producto 1', 1, 100, 100],
              ['002', 'Producto 2', 2, 50, 100]
            ]
          }
        },
        {
          columns: [
            {},
            {
              style: 'totalsTable',
              table: {
                widths: ['auto', 'auto'],
                body: [
                  ['Op. Gravadas:', 200],
                  ['IGV (18%):', 36],
                  ['Importe Total:', 236]
                ]
              },
              layout: 'noBorders'
            }
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        invoiceTitle: {
          fontSize: 16,
          bold: true,
          margin: [0, 20, 0, 10]
        },
        invoiceNumber: {
          fontSize: 12,
          alignment: 'right'
        },
        invoiceSubheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        },
        totalsTable: {
          bold: true,
          margin: [0, 30, 0, 0]
        }
      }
    };

    pdfMake.createPdf(documentDefinition).open();
  }



}
