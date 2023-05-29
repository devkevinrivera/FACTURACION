import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'semantic-ui-css/semantic.min.css'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'
import { Provider } from 'react-redux';
import store from '../redux/store';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [openProviderModal, setOpenProviderModal] = useState();

  const handlerOpen = (datosProvider) => {

  };
  return (
    <>
    <Provider store={store}>
      <AppHeader />
      <ProviderModal element={{
        nombreEmpresa: 'KEVIN',
        nif: 'XXXXXX',
        direccion: 'Plaza musico',
        correoElectronico: 'kevinriveradev@gmail.com'
      }} onSave={handlerOpen} isOpen={openProviderModal} onClose={setOpenProviderModal}/>
      <Container>
        <Grid columns={16} className='factura'>
          <Grid.Row>
            <Grid.Column computer={8}>
              <div class=" p-4 rounded-lg px-6">
                <h2 class=" bg-blue-500 text-white text-2xl font-bold mb-2 card-button">
                  Datos del proveedor
                  <Icon name="pencil" color='white' className='float-right pointer' onClick={() => setOpenProviderModal(true)} />
                </h2>
                <p><span class="font-bold">Nombre de la Empresa:</span> Empresa ABC</p>
                <p><span class="font-bold">NIF:</span> 12345678X</p>
                <p><span class="font-bold">Dirección:</span> Calle Principal, 123</p>
                <p><span class="font-bold">Correo Electrónico:</span> ejemplo@empresa.com</p>
              </div>
            </Grid.Column>
            <Grid.Column computer={8}>
              <div class="p-4 rounded-lg px-6">
                <h2 class="bg-blue-500 text-white text-2xl font-bold mb-2 card-button">
                  Datos del Cliente
                  <Icon name="pencil" color='white' className='float-right pointer' />
                </h2>
                <p><span class="font-bold">Nombre de la Empresa:</span> Empresa ABC</p>
                <p><span class="font-bold">NIF:</span> 12345678X</p>
                <p><span class="font-bold">Dirección:</span> Calle Principal, 123</p>
                <p><span class="font-bold">Correo Electrónico:</span> ejemplo@empresa.com</p>
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
                  <p><span class="font-bold">Base Imponible:</span> 100.00€</p>
                </div>
                <div class="mt-4">
                  <p><span class="font-bold">IVA (21%):</span> 21.00€</p>
                </div>
                <div class="mt-4">
                  <p><span class="font-bold">Total:</span> 121.00€</p>
                </div>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Provider>
      
    </>
  )
}

import { Table } from 'semantic-ui-react';
import AppHeader from '../../components/CustomHeader'
import ProviderModal from '../../components/ProviderModal';
import { useState } from 'react';

function Tabla() {
  return (
    <>
      <Table celled className='factura-border'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Concepto</Table.HeaderCell>
            <Table.HeaderCell>Cantidad</Table.HeaderCell>
            <Table.HeaderCell>Precio</Table.HeaderCell>
            <Table.HeaderCell>Impuesto</Table.HeaderCell>
            <Table.HeaderCell>Importe</Table.HeaderCell>
            <Table.HeaderCell><Icon name="plus" className='factura-icon' size='big'/></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Producto 1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>$10.00</Table.Cell>
            <Table.Cell>10%</Table.Cell>
            <Table.Cell>$20.00</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Producto 2</Table.Cell>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>$15.00</Table.Cell>
            <Table.Cell>5%</Table.Cell>
            <Table.Cell>$15.75</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
     
    </>
  );
}
