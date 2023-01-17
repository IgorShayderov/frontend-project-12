import React from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
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
          onClick={handleClose}></button>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <FormControl
              value={ t('modals.removeModal.submit') }
              type="submit" />
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddModal.propTypes = {
  handleClose: PropTypes.func,
  removeChannel: PropTypes.func,
  show: PropTypes.bool,
};

export default AddModal;
