import React from 'react';
import { Button, Modal, Form } from 'semantic-ui-react';
import { useForm } from 'react-hook-form';

const ProviderModal = ({ isOpen, onClose, onSave, element }) => {
  const { register, handleSubmit, setValue } = useForm();

  const handleOpen = () => {
    setValue('nombreEmpresa', element?.nombreEmpresa || '');
    setValue('nif', element?.nif || '');
    setValue('direccion', element?.direccion || '');
    setValue('correoElectronico', element?.correoElectronico || '');
  };

  const handleClose = () => {
    onClose();
  };

  const handleSave = (data) => {
    onSave(data);
    handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose} onOpen={handleOpen}>
      <Modal.Header>{element ? 'Editar Elemento' : 'Crear Elemento'}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit(handleSave)}>
          <Form.Field>
            <label>Nombre de la Empresa</label>
            <input name="nombreEmpresa" ref={register} />
          </Form.Field>
          <Form.Field>
            <label>NIF</label>
            <input name="nif" ref={register} />
          </Form.Field>
          <Form.Field>
            <label>Dirección</label>
            <input name="direccion" ref={register} />
          </Form.Field>
          <Form.Field>
            <label>Correo Electrónico</label>
            <input name="correoElectronico" ref={register} />
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

export default ProviderModal;
