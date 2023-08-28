import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { setClientData, setProviderData } from '@/redux/reducers/facturaSlice';

const ClientSelectModal = ({ isOpen, onClose, onSave, element }) => {
  const { register, handleSubmit, setValue, values } = useForm({
    defaultValues: {
      nombreEmpresa: 'John',
      nif: 'Doe',
      direccion: 'Doe',
      correoElectronico: 'Doe',
      numFactura: 0,
      date: 0,
    },
    });
    const dispatch = useDispatch();
  const { provider } = useSelector(state => state.factura)
  const handleOpen = () => {
    setValue('nombreEmpresa', provider?.nombreEmpresa || '');
    setValue('nif', provider?.nif || '');
    setValue('direccion', provider?.direccion || '');
    setValue('correoElectronico', provider?.correoElectronico || '');
    setValue('date', provider?.date || '');
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = (data) => {
    console.log(data)
    dispatch(setClientData({
      ...data
    }))
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <Modal.Header>{element ? 'Editar Elemento' : 'Crear Elemento'}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(handleSave)}>
          <Form.Field>
            <label>Número de factura</label>
            <input value={values?.numFactura} onChange={(ev) => setValue('numFactura',ev.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Nombre de la Empresa</label>
            <input value={values?.nombreEmpresa} onChange={(ev) => setValue('nombreEmpresa',ev.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>NIF</label>
            <input name="nif" value={values?.nif} onChange={(ev) => setValue('nif',ev.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Dirección</label>
            <input name="direccion" value={values?.direccion} onChange={(ev) => setValue('direccion',ev.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Correo Electrónico</label>
            <input value={values?.correoElectronico} onChange={(ev) => setValue('correoElectronico',ev.target.value)}/>
          </Form.Field>
          <Form.Field>
            <label>Fecha</label>
            <input value={values?.date} onChange={(ev) => setValue('date',ev.target.value)}/>
          </Form.Field>
          <Button type="submit">Guardar</Button>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Cerrar</Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ClientSelectModal;
