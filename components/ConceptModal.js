import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addConcept, setClientData, setProviderData } from '@/redux/reducers/facturaSlice';
import { v4 as uuidv4 } from 'uuid';

const ConceptModal = ({ isOpen, onClose, onSave, element }) => {
  const { register, handleSubmit, setValue, values } = useForm({
    defaultValues: {
      concepto: 'John',
      cantidad: 'Doe',
      precio: 'Doe',
    },
    });
    const dispatch = useDispatch();
  const { provider } = useSelector(state => state.factura)
  const handleOpen = () => {
    setValue('concepto', provider?.nombreEmpresa || '');
    setValue('cantidad', provider?.nif || '');
    setValue('precio', provider?.direccion || '');
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = (data) => {
    dispatch(addConcept({
        ...data,
        id: uuidv4()
    }))
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <Modal.Header>{element ? 'Editar Elemento' : 'Crear Elemento'}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(handleSave)}>
          <Form.Field>
            <label>Concepto</label>
            <input value={values?.nombreEmpresa} onChange={(ev) => setValue('concepto',ev.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Precio</label>
            <input name="direccion" value={values?.direccion} onChange={(ev) => setValue('precio',ev.target.value)} />
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

export default ConceptModal;
