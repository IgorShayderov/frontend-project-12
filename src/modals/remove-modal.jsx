import React from 'react';
import {
  Modal, Form, FormGroup, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import useLoadingState from '../hooks/useLoadingState';
import { actions } from '../slices/modal-slice';

const AddModal = (props) => {
  const { removeChannel, show } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isLoading, callWithLoading } = useLoadingState();

  const close = () => {
    dispatch(actions.closeModal());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await callWithLoading(removeChannel);
    close();
  };

  return (
    <Modal show={show} onHide={close} centered>
      <Modal.Header>
        <Modal.Title>{ t('modals.removeModal.title') }</Modal.Title>

        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={close}
        />
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Button
              disabled={isLoading}
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
