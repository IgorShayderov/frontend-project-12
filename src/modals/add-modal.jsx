import React, { useEffect, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useImmer } from 'use-immer';

const AddModal = (props) => {
  const {
    handleClose, addChannel, show, channels,
  } = props;
  const inputEl = useRef(null);

  const [errorsState, updateErrorState] = useImmer({
    isShown: false,
    message: '',
  });
  const errorEl = useRef(null);

  const resetErrorsState = () => {
    updateErrorState((errorsState) => {
      errorsState.message = '';
      errorsState.isShown = false;
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: (values, { resetForm }) => {
      if (!channels.some((channel) => channel.name === values.name)) {
        addChannel(values);
        resetForm();
      } else {
        updateErrorState((errorsState) => {
          errorsState.message = 'Name already exists!';
          errorsState.isShown = true;
        });
      }
    },
  });

  useEffect(() => {
    if (errorsState.isShown) {
      errorEl.current.style.display = 'block';
    } else {
      errorEl.current.style.display = 'none';
    }
  }, [errorsState.isShown]);

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
          <Form.Group>
            <Form.Control
              id="new-channel-input"
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              onInput={resetErrorsState}
              value={formik.values.name}
              name="name"
              autoComplete="off"
              className="mb-2"
              placeholder="Name"
              required />

            <Form.Text
              className="text-danger mb-2"
              ref={errorEl}>
              {errorsState.message}
            </Form.Text>

            <Form.Control
              value="Submit"
              type="submit"/>
          </Form.Group>
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
