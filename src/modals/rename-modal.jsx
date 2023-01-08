import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

const AddModal = (props) => {
  const {
    handleClose, renameChannel, show, channelName,
  } = props;
  const inputEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      text: channelName,
    },
    onSubmit: (values, { resetForm }) => {
      renameChannel(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (show) {
      inputEl.current.focus();
      inputEl.current.select();
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
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              value={formik.values.text}
              className="mb-2"
              name="text"
              autoComplete="off"
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
  renameChannel: PropTypes.func,
  show: PropTypes.bool,
  channelName: PropTypes.string,
};

export default AddModal;
