import React from 'react';
import {
  Modal, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const AddModal = (props) => {
  const { handleClose, removeChannel, show } = props;
  const { t } = useTranslation();

  const onSubmit = (e) => {
    e.preventDefault();
    removeChannel();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{ t('modals.removeModal.title') }</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Button
              className="button btn-danger w-100"
              type="submit"
            >
              { t('modals.removeModal.submit') }
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
