import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useImmer } from 'use-immer';
import { useTranslation } from 'react-i18next';

const AddModal = (props) => {
  const {
    handleClose, renameChannel, show, channelName, channels,
  } = props;
  const inputEl = useRef(null);
  const { t } = useTranslation();

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
      text: channelName,
    },
    onSubmit: (values, { resetForm }) => {
      if (!channels.some((channel) => channel.name === values.text)) {
        renameChannel(values);
        resetForm();
      } else {
        updateErrorState((errorsState) => {
          errorsState.message = t('modals.renameModal.errors.uniqueness');
          errorsState.isShown = true;
        });
      }
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
        <Modal.Title>{ t('modals.renameModal.title') }</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}></button>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-floating">
            <FormControl
              id="new-channel-input"
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              onInput={resetErrorsState}
              value={formik.values.text}
              className="mb-2"
              name="text"
              autoComplete="off"
              required />

            <Form.Label htmlFor="new-channel-input" className="w-100 m-0">
              {t('modals.addModal.label')}
            </Form.Label>

            <FormControl
              value={ t('modals.renameModal.submit') }
              type="submit"/>

            <Form.Text
              className="text-danger mb-2"
              ref={errorEl}>
              {errorsState.message}
            </Form.Text>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
