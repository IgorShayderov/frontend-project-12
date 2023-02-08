/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';

import { fetchChannels, actions as channelsActions } from '../slices/channels-slice';
import { actions as messagesActions } from '../slices/messages-slice';
import { useAuth } from '../components/auth-provider.jsx';
import { useToast } from '../components/toast-provider.jsx';

import Channel from '../components/channel.jsx';
import Message from '../components/message.jsx';
import getModal from '../modals';

const filter = require('leo-profanity');

filter.loadDictionary('ru');

const renderModal = ({
  isModalShown,
  modalType,
  handleClose,
  addChannel,
  renameChannel,
  removeChannel,
  channels,
  channelName,
}) => {
  if (modalType === null) {
    return null;
  }

  const Modal = getModal(modalType);

  return (
    <Modal
      show={isModalShown}
      handleClose={handleClose}
      channels={channels}
      addChannel={addChannel}
      renameChannel={renameChannel}
      removeChannel={removeChannel}
      channelName={channelName}
    />
  );
};

const socket = io();

const Root = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const toast = useToast();

  const [isModalShown, setModalShown] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingChannelId, setEditingChannelId] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { channels, currentChannelId } = useSelector((store) => store.channels);
  const { messages } = useSelector((store) => store.messages);

  const handleAddChannel = () => {
    setModalType('adding');
    setModalShown(true);
  };

  const addChannel = async ({ name }) => {
    const data = await socket.emit('newChannel', { name });

    dispatch(channelsActions.setChannel(data.id));
    setModalShown(false);
    toast.notify(t('actions.channel.add'));
  };

  const renameChannel = ({ text }) => {
    socket.emit('renameChannel', { id: editingChannelId, name: text });
    setModalShown(false);
    toast.notify(t('actions.channel.rename'));
  };

  const removeChannel = () => {
    socket.emit('removeChannel', { id: editingChannelId });
    setModalShown(false);
    toast.notify(t('actions.channel.remove'));
  };

  const handleClose = () => {
    setModalType(null);
    setModalShown(false);
  };

  const openRenameModal = (channelId) => () => {
    setEditingChannelId(channelId);
    setModalType('renaming');
    setModalShown(true);
  };
  const openRemoveModal = (channelId) => () => {
    setEditingChannelId(channelId);
    setModalType('removing');
    setModalShown(true);
  };

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate('/login');
    } else {
      try {
        dispatch(fetchChannels(token));
      } catch {
        toast.warn(t('actions.errors.dataLoad'));
      }
    }

    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(channelsActions.renameChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      const { id } = payload;

      dispatch(channelsActions.removeChannel(id));
    });

    return () => {
      socket.off();
    };
  }, [dispatch, navigate, toast, token]);

  const changeChannel = (channelId) => (event) => {
    event.preventDefault();
    dispatch(channelsActions.setChannel(channelId));
  };

  const [newMessage, setNewMessage] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();

    if (newMessage.length > 0) {
      socket.emit('newMessage', {
        body: filter.clean(newMessage),
        channelId: currentChannelId,
        username: auth.currentUser,
      });
      setNewMessage('');
    }
  };
  const onMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="flex-grow-1 h-100 d-flex flex-column">
      <div className="row flex-grow-1">
        <div className="col-2 bg-light">
          <p className="d-flex align-items-center justify-content-between px-1 mb-2">
            { t('channels') }
            <button
              className="bg-light add-btn"
              aria-label="Add channel"
              type="button"
              onClick={handleAddChannel}
            >
              +
            </button>
          </p>

          <ul className="list-group channels-list">
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                channel={channel}
                activeChannelId={currentChannelId}
                changeChannel={changeChannel}
                handleRename={openRenameModal}
                handleRemove={openRemoveModal}
              />
            ))}
          </ul>
        </div>

        <div className="col-10 bg-white d-flex flex-column ps-0">
          <div className="flex-grow-1">
            <ul className="list-group h-100 flex-column justify-content-end">
              {messages
                .filter(({ channelId }) => channelId === currentChannelId)
                .map(({ id, body, username }) => (
                  <Message
                    key={id}
                    text={body}
                    isHighlighted={username === auth.currentUser}
                    username={username}
                  />
                ))}
            </ul>
          </div>

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
                value="Send"
              />
            </form>
          </div>
        </div>
      </div>

      { renderModal({
        isModalShown,
        modalType,
        handleClose,
        addChannel,
        renameChannel,
        removeChannel,
        channels,
        channelName: channels.find((channel) => channel.id === editingChannelId)?.name ?? '',
      }) }
    </div>
  );
};

export default Root;
