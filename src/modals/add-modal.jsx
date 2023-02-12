import React, { useEffect, useRef } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';

const AddModal = (props) => {
  const {
    handleClose, addChannel, show, channels,
  } = props;
  const inputEl = useRef(null);
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().notOneOf(channels.map((channel) => channel.name)),
    }),
    onSubmit: (values, { resetForm }) => {
      if (formik.isValid) {
        addChannel(values);
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (show) {
      inputEl.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>{ t('modals.addModal.title') }</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="form-floating">
            <Form.Control
              id="new-channel-input"
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              value={formik.values.name}
              maxLength="30"
              name="name"
              autoComplete="off"
              className="mb-2"
              placeholder="Name"
              aria-describedby="newChannelErrorMessage"
              required
            />

            <Form.Label htmlFor="new-channel-input" className="w-100 m-0">
              {t('modals.addModal.label')}
            </Form.Label>

            <Form.Text
              id="newChannelErrorMessage"
              className="text-danger mb-2"
            >
              { formik.errors.name }
            </Form.Text>

            <Form.Control
              value={t('modals.addModal.submit')}
              type="submit"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
