import React from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const AddModal = (props) => {
  const { handleClose, removeChannel, show } = props;

  const onSubmit = (e) => {
    e.preventDefault();
    removeChannel();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Remove channel</Modal.Title>

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
              value="Submit"
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
