import axios from 'axios';

const PDFDocument = require('pdfkit');
const pdf = require('html-pdf');


export default function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  if (method === 'POST') {
    generateFactura(req, res,id);
  }
 
}

function getRandomNumber() {
  return Math.floor(Math.random() * 11) + 30; // Número aleatorio entre 30 y 40
}

function convertirADinero(numero) {
    try {
      const dinero = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(numero);
      return dinero;
    } catch (error) {
      return "Error: El valor ingresado no es un número válido.";
    }
  }
  
const generateFactura = async (req, res, id) => {
    console.log('---------------req.body')
    console.log(req.body)

    const { cliente , conceptos, totales } = req.body;
    console.log(conceptos)
  const html = `
    <html>
      <head>
        <link rel='stylesheet' type='text/css' href='/css/pdf.css' />
      </head>
      <body class="body-factura">
      <style>
        .body-factura {
            /* background-color: brown; */
            font-size: 14px !important;
            font-family: 'Montserrat', sans-serif;
        }

        .body-fatura-cabecera {
            display: -webkit-box;
            /* wkhtmltopdf uses this one */
            display: flex;
            -webkit-box-pack: center;
            /* wkhtmltopdf uses this one */
        }

        .body-fatura-cabecera-datos {
            display: -webkit-box !important;
            /* wkhtmltopdf uses this one */
            display: flex;
            /* wkhtmltopdf uses this one */
            justify-content: space-around;
            -webkit-justify-content: space-around;
            margin-top: 2rem;
            background-color: #f1f2f3;
            border-radius: 8px !important;
            padding: 1rem !important;
        }

        .body-fatura-tabla {
            display: -webkit-box !important;
            /* wkhtmltopdf uses this one */
            display: flex;
            /* wkhtmltopdf uses this one */
            justify-content: space-around;
            -webkit-justify-content: space-around;
            margin-top: 2rem;
            background-color: #f1f2f3;
            border-radius: 8px !important;
            padding: 1rem !important;
        }

        .body-fatura-tabla table {
            width: 100%;
        }

        .body-fatura-tabla table td {
            text-align: right;
        }

        .table-right {
            text-align: right;
        }
        .body-fatura-cabecera-facturacion {
            display: -webkit-box !important;
            /* wkhtmltopdf uses this one */
            display: flex;
            /* wkhtmltopdf uses this one */
                justify-content: space-around;
                -webkit-justify-content: space-around;
            margin-top: 1rem;
            background-color: #f1f2f3;
            border-radius: 8px !important;
            padding: 1rem !important;
        }

        .margin-datos-envio {
            margin-right: 10rem !important;
        }
        .account-number {
            background: #f1f2f3;
            border-radius: 8px;
        }
        .text-a-center {
            text-align: center;
        }
        .margin-right-2 {
            margin-right: 2rem !important;
        }
        .text-font {
            color: black;
            font-size: 16px;
            margin: 0px !important;
        }

        .text-font-title {
            color: black;
            font-size: 16px;
            font-weight: bold;
        }

        .final-price {
            border-radius: 8px !important;
            padding-left: 70% !important;
            margin-top: 1rem;
        }
        .alinear-derecha {
          text-align: right;
        }
        .total-content {
          width: 15rem !important;
          background: #f1f2f3;
          display: flex !important;
          justify-content: space-between !important;
        }
        .total-content p {
          width: 100%;
        }
        .total-content .title-ex {
          width: 50% !important;
        }
        .total-content .title-external {
          width: 50% !important;
          text-align: right;
        }
        .result  {
          width: 80% !important;
          font-weight: bold;
        }
        .ancho-fijo {
          width: 200px !important;
        }
      </style>
        <section>
          <div class="body-fatura-cabecera"> 
            <div style="width: 50%">
                <p class="text-font">NIF ${cliente.nif}</p>
                <p class="text-font">${cliente.nombreEmpresa}</p>
                <p class="text-font">${cliente.direccion}</p>
                <p class="text-font">${cliente.correoElectronico}</p>
            </div>
            <div style="width: 50%">
              <p class="text-font">Número factura: ${cliente?.numFactura}</p>
              <p class="text-font">NIF 44930765N</p>
              <p class="text-font">Calle Bilbao Nº 43 46009</p>
              <p class="text-font">València, Valencia</p>
              <p class="text-font">+34 633140422</p>
              <p class="text-font">torres.serviciosdelimpieza@gmail.com</p>
              <p class="text-font">www.torreslimpiezas.es</p>
            </div>
          </div>

          
          <div class="body-fatura-tabla">
            <table>
              <thead>
                <tr>
                  <th class="table-right">Concepto</th>
                  <th class="table-right">Precio</th>
                </tr>
              </thead>
              <tbody>
              ${
                conceptos.map(entry => (
                    `<tr>
                        <td>${entry.concepto}</td>
                        <td>${convertirADinero(entry.precio)}</td>
                    </tr>`
                ))
              }
              </tbody>
            </table>
            
          </div>
          <div class="account-number">
            <p>Número de cuenta: </p>
            <p><b>ES95 0182 6589 7102 0387 7801</b></p>
            </div>
          <div class="final-price">
            <div class="container">
               <table>
                <tbody>
                  <tr>
                    <td class="ancho-fijo">Base Imponible</td>
                    <td></td>
                    <td class="alinear-derecha">${convertirADinero(totales.total)}</td>
                  </tr>
                  <tr>
                    <td class="ancho-fijo">IVA (21%)</td>
                    <td></td>
                    <td class="alinear-derecha">${convertirADinero(totales.iva)}</td>
                  </tr>
                  <tr>
                    <td class="ancho-fijo">Total</td>
                    <td></td>
                    <td class="alinear-derecha">${convertirADinero(totales.subtotal)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
     <style>
      .flex {
         !important;
      }
    </style>
      </body>
    </html>
  `;

  // Opciones para generar el PDF
  const options = {
    format: 'Letter',
    border: {
      top: '0.5in',
      right: '0.5in',
      bottom: '0.5in',
      left: '0.5in'
    },
  };

  // Generamos el PDF y lo enviamos como respuesta
  pdf.create(html, options).toBuffer((err, buffer) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
    res.send(buffer);
  });
}