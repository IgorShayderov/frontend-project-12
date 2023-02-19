import React, { useEffect, useRef } from 'react';
import {
  Modal, Form, FormGroup, FormControl,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

import useLoadingState from '../hooks/useLoadingState';
import { actions } from '../slices/modal-slice';

const AddModal = (props) => {
  const { renameChannel, show } = props;
  const dispatch = useDispatch();
  const inputEl = useRef(null);
  const { t } = useTranslation();
  const { channels } = useSelector((store) => store.channels);
  const { editingChannelId } = useSelector((store) => store.modal);
  const { isLoading, callWithLoading } = useLoadingState();

  const getChannelName = () => channels.find((channel) => channel.id === editingChannelId)?.name ?? '';

  const close = () => {
    dispatch(actions.closeModal());
  };

  const formik = useFormik({
    initialValues: {
      text: getChannelName(),
    },
    validationSchema: Yup.object({
      text: Yup.string().notOneOf(channels.map((channel) => channel.name)),
    }),
    onSubmit: async (values, { resetForm }) => {
      if (formik.isValid) {
        await callWithLoading(renameChannel.bind(null, values));
        close();
        resetForm();
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (show) {
      inputEl.current.focus();
      inputEl.current.select();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header>
        <Modal.Title>{ t('modals.renameModal.title') }</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={close}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <FormGroup className="form-floating">
            <FormControl
              id="new-channel-input"
              type="text"
              ref={inputEl}
              onChange={formik.handleChange}
              value={formik.values.text}
              maxLength="30"
              className="mb-2"
              name="text"
              autoComplete="off"
              aria-describedby="renameChannelErrorMessage"
              required
            />

            <Form.Label htmlFor="new-channel-input" className="w-100 m-0">
              {t('modals.addModal.label')}
            </Form.Label>

            <Form.Text
              id="renameChannelErrorMessage"
              className="text-danger mb-2"
            >
              { formik.errors.text }
            </Form.Text>

            <FormControl
              disabled={isLoading}
              value={t('modals.renameModal.submit')}
              type="submit"
            />
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddModal;
