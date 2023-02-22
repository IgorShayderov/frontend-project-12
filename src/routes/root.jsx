/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import leoProfanity from 'leo-profanity';

import { fetchChannels, actions as channelsActions } from '../slices/channels-slice';
import { useAuth } from '../components/auth-provider.jsx';
import { useToast } from '../components/toast-provider.jsx';
import api from '../api';

import ChannelsList from '../components/channelsList.jsx';
import MessagesList from '../components/messagesList.jsx';
import getModal from '../modals';
import routes from '../routes';

const renderModal = ({
  isModalShown,
  modalType,
  addChannel,
  renameChannel,
  removeChannel,
}) => {
  if (modalType === null) {
    return null;
  }

  const Modal = getModal(modalType);

  return (
    <Modal
      show={isModalShown}
      addChannel={addChannel}
      renameChannel={renameChannel}
      removeChannel={removeChannel}
    />
  );
};

const Root = () => {
  const { t } = useTranslation();
  const { currentUser, getToken } = useAuth();
  const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentChannelId } = useSelector((store) => store.channels);
  const {
    type: modalType,
    isShown: isModalShown,
    editingChannelId,
  } = useSelector((store) => store.modal);

  const addChannel = async ({ name }) => {
    const data = await api.createChannel({ name });

    dispatch(channelsActions.setChannel(data.id));
    toast.notify(t('actions.channel.add'));
  };

  const renameChannel = async ({ text }) => {
    await api.renameChannel({ id: editingChannelId, name: text });
    toast.notify(t('actions.channel.rename'));
  };

  const removeChannel = async () => {
    await api.removeChannel({ id: editingChannelId });
    toast.notify(t('actions.channel.remove'));
  };

  const token = getToken();

  useEffect(() => {
    if (token === null) {
      navigate(routes.loginPath());
    } else {
      try {
        dispatch(fetchChannels(token));
      } catch {
        toast.warn(t('actions.errors.dataLoad'));
      }
    }
  }, [token]);

  const [newMessage, setNewMessage] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();

    if (newMessage.length > 0) {
      api.addMessage({
        body: leoProfanity.clean(newMessage),
        channelId: currentChannelId,
        username: currentUser,
      });
      setNewMessage('');
    }
  };
  const onMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="h-100 d-flex flex-column">
      <div className="row m-0">
        <ChannelsList />

        <div className="col-10 bg-white d-flex flex-column p-0">
          <MessagesList />

          <div className="pb-3">
            <form onSubmit={sendMessage}>
              <input
                aria-label={t('fields.message.ariaLabel')}
                className="w-100"
                maxLength="100"
                placeholder={t('fields.message.placeholder')}
                value={newMessage}
                onInput={onMessageInput}
              />

              <input
                disabled={newMessage.length === 0}
                className="w-100"
                type="submit"
                value={t('actions.message.submit')}
              />
            </form>
          </div>
        </div>
      </div>

      { renderModal({
        isModalShown,
        modalType,
        addChannel,
        renameChannel,
        removeChannel,
      }) }
    </div>
  );
};

export default Root;
