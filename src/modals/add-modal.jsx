import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const AddModal = (props) => {
  const {
    handleClose, addChannel, show, channels,
  } = props;
  const inputEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (!channels.some((channel) => channel.name === values.name)) {
        addChannel(values);
        resetForm();
      } else {
        console.info('Name already exists!');
      }
    },
  });

  useEffect(() => {
    if (show) {
      inputEl.current.focus();
    }
  }, []);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Add channel</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}></button>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <FormControl
              id="new-channel-input"
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              value={formik.values.name}
              name="name"
              autoComplete="off"
              className="mb-2"
              placeholder="Name"
              required />

            <FormControl
              value="Submit"
              type="submit"/>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

AddModal.propTypes = {
  handleClose: PropTypes.func,
  addChannel: PropTypes.func,
  show: PropTypes.bool,
  channels: PropTypes.array,
};

export default AddModal;
