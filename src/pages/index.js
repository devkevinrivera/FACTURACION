import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'semantic-ui-css/semantic.min.css'
import { Button, Container, Grid, Header, Icon } from 'semantic-ui-react'
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from '../redux/store';
import ProviderModal from '../../components/ProviderModal';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [openProviderModal, setOpenProviderModal] = useState();
  const [openClientModal, setOpenClientModal] = useState();
  const { provider } = useSelector(state => state.factura)
  const { client } = useSelector(state => state.factura)
  const { concepts } = useSelector(state => state.factura)


  const [total,setTotal] = useState();
  const [subtotal, setSubTotal] = useState();
  const [iva,setIva] = useState();
  const handlerOpen = (datosProvider) => {
    
  };

  const generateFactu = async () => {
    const requesBody = {
      name: 'kevin'
    }
    axios({
      url: '/api/factura',
      method: 'POST',
      responseType: 'blob' ,// Indica que la respuesta será un blob (Binary Large Object)
      data: {
        cliente: client,
        conceptos: concepts,
        totales: {
          total: total,
          subtotal: subtotal,
          iva: iva
        },
      }
    },requesBody)
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'factura.pdf'); // Nombre del archivo a descargar
        document.body.appendChild(link);
        link.click();
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    let total = 0;

    concepts.map(concepto => {
      total += parseInt(concepto.precio);
    });

    setTotal(total);

    let calculateIva = ((total * 21)/100) + total;
    setIva((total * 21)/100)
    setSubTotal(calculateIva);
  },[concepts]);

  return (
    <>
      <AppHeader />
      
      <ProviderModal element={{
        nombreEmpresa: 'KEVIN',
        nif: 'XXXXXX',
        direccion: 'Plaza musico',
        correoElectronico: 'kevinriveradev@gmail.com'
      }} onSave={handlerOpen} isOpen={openProviderModal} onClose={setOpenProviderModal}/>
      
      <ClientSelectModal element={{
        nombreEmpresa: 'KEVIN',
        nif: 'XXXXXX',
        direccion: 'Plaza musico',
        correoElectronico: 'kevinriveradev@gmail.com'
      }} onSave={handlerOpen} isOpen={openClientModal} onClose={setOpenClientModal}/>
      
      <Container>
        <Grid columns={16} className='factura'>
          <Grid.Row>
            <Grid.Column computer={8}>
              <div class=" p-4 rounded-lg px-6">
                <h2 class=" bg-blue-500 text-white text-2xl font-bold mb-2 card-button">
                  Datos del proveedor
                  <Icon name="pencil" color='white' className='float-right pointer' onClick={() => setOpenProviderModal(true)} />
                </h2>
                <p class="text-font">NIF 53881109k</p>
                <p class="text-font">Plaza musico espi 10</p>
                <p class="text-font">València, Valencia</p>
                <p class="text-font">+34 631021443</p>
              </div>
            </Grid.Column>
            <Grid.Column computer={8}>
              <div class="p-4 rounded-lg px-6">
                <h2 class="bg-blue-500 text-white text-2xl font-bold mb-2 card-button">
                  Datos del Cliente
                  <Icon name="pencil" color='white' className='float-right pointer' onClick={() => setOpenClientModal(true)} />
                </h2>
                <p><span class="font-bold">Nombre de la Empresa:</span> {client?.nombreEmpresa}</p>
                <p><span class="font-bold">NIF:</span> {client?.nif}</p>
                <p><span class="font-bold">Dirección:</span> {client?.direccion}</p>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <Tabla />
            </Grid.Column>
            <Grid.Column computer={11}>

            </Grid.Column>
            <Grid.Column computer={5}>
              <div class="bg-gray-200 p-4 rounded-lg">
                <div class="mt-4">
                  <p><span class="font-bold">Base Imponible:</span> {total}€</p>
                </div>
                <div class="mt-4">
                  <p><span class="font-bold">IVA (21%):</span> {iva}€</p>
                </div>
                <div class="mt-4">
                  <p><span class="font-bold">Total:</span> {subtotal}€</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column computer={16}>
              <Button color='green' onClick={() => generateFactu()}>Generar Factura</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}

import { Table } from 'semantic-ui-react';
import AppHeader from '../../components/CustomHeader'
import { useEffect, useState } from 'react';
import { deleteConcept, setClientData, setProviderData } from '@/redux/reducers/facturaSlice';
import ClientSelectModal from '../../components/ClientModalNow';
import ConceptModal from '../../components/ConceptModal';
import axios from 'axios';

function Tabla() {
  const [showModa, setShowModal] = useState(false);
  const { concepts } = useSelector(state => state.factura);
  const dispatch = useDispatch();
  const handlerOpen = () => {

  };

  return (
    <>
      <ConceptModal element={{
        nombreEmpresa: 'KEVIN',
        nif: 'XXXXXX',
        direccion: 'Plaza musico',
        correoElectronico: 'kevinriveradev@gmail.com'
      }} onSave={handlerOpen} isOpen={showModa} onClose={setShowModal}/>
      
      <Table celled className='factura-border'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Concepto</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Impuesto</Table.HeaderCell>
            <Table.HeaderCell><Icon onClick={() => setShowModal(true)} name="plus" className='factura-icon' size='big'/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {
            concepts.map(entry => (
              <Table.Row>
                <Table.Cell>{entry.concepto}</Table.Cell>
                <Table.Cell>{entry.precio}</Table.Cell>
                <Table.Cell>21%</Table.Cell>
                <Table.Cell>
                  <Icon 
                  style={{
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    dispatch(deleteConcept({
                      id: entry.id
                    }))
                  }} name="trash" color='red' />
                </Table.Cell>
              </Table.Row>
            ))
          }
        </Table.Body>
      </Table>
     
    </>
  );
}
