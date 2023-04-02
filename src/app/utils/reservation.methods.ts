// const pdfMake = require('pdfmake/build/pdfmake.js');
// const pdfFonts = require('pdfmake/build/vfs_fonts.js');

// export const generatePDF = (
//   names: string,
//   codigo: any,
//   descripcion: string,
//   cantidad: number,
//   valorUnitario: number,
//   igv: number,
//   importeTotal: number,
// ) => {
//   pdfMake.vfs = pdfFonts.pdfMake.vfs;
//   var documentDefinition = {
//     content: [

//       {
//         columns: [
//           {
//             width: "*",
//             text: "RUC: 20603942389",
//             fontSize: 20,
//             bold: true
//           },
//           {
//             width: "*",
//             text: "FACTURA ELECTRÓNICA\nFHTT-000001",
//             fontSize: 20,
//             bold: true,
//             alignment: "right"
//           }
//         ]
//       },
//       {
//         text: "HOSTAL MIRADOR TORRE TORRE",
//         fontSize: 16,
//         bold: true,
//         margin: [0, 10, 0, 0]
//       },
//       {
//         text: "JR. TORRE TORRE NRO. 202 (A 1/2 CDRA DEL PARQUE CERRITO LA LIBERTAD)",
//         fontSize: 12,
//         margin: [0, 5, 0, 0]
//       },
//       {
//         layout: "lightHorizontalLines",
//         margin: [0, 10],
//         table: {
//           headerRows: 1,
//           widths: ["*", "*"],
//           body: [
//             [
//               { text: "Fecha de emisión", bold: true },
//               { text: `${this.date.toLocaleDateString()}` }
//             ],
//             [
//               { text: "Tipo y número de documento del cliente:", bold: true },
//               { text: "" }
//             ],
//             [
//               { text: "Nombre o razón social del cliente:", bold: true },
//               { text: `${names}` }
//             ],
//             [
//               { text: "Dirección del cliente:", bold: true },
//               { text: "" }
//             ]
//           ]
//         }
//       },
//       {
//         layout: "lightHorizontalLines",
//         margin: [0, 10],
//         table: {
//           headerRows: 1,
//           widths: ["auto", "*", "auto", "auto"],
//           body: [
//             [
//               { text: "Código", bold: true, alignment: "center" },
//               { text: "Descripción", bold: true, alignment: "center" },
//               { text: "Cantidad", bold: true, alignment: "center" },
//               { text: "Valor unitario", bold: true, alignment: "center" },
//             ],
//             // repeat this row for each item
//             [
//               `${codigo}`,
//               `${descripcion}`,
//               {
//                 text: `${cantidad}`, alignement: "center"
//               },
//               {
//                 text: `${valorUnitario}`, alignement: "center"
//               },
//             ]
//           ]
//         }
//       },
//       {
//         layout: "lightHorizontalLines",
//         margin: [0, 10],
//         table: {
//           headerRows: 1,
//           widths: ["*", "auto"],
//           body: [
//             [
//               { text: "Operaciones gravadas", bold: true },
//               { text: "" }
//             ],
//             [
//               { text: "IGV (18%)", bold: true },
//               { text: `${igv}` }
//             ],
//             [
//               { text: "Importe total", bold: true },
//               { text: `S/${importeTotal}` }
//             ]
//           ]
//         }
//       },
//     ],
//     styles: {

//     }
//   };

//   pdfMake.createPdf(documentDefinition).open();
//   // pdfMake.createPdf(documentDefinition).download('factura.pdf');
// }