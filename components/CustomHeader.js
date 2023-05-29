import { Container, Header, Icon } from 'semantic-ui-react';

function AppHeader() {
  return (
    <Container fluid className='mt-2'>
      <Header as="h1" textAlign="center" icon>
        <Icon name="file alternate outline" className='factura-icon' />
        Facturación App
        <Header.Subheader>Sistema de facturación y gestión de clientes</Header.Subheader>
      </Header>
    </Container>
  );
}

export default AppHeader;
