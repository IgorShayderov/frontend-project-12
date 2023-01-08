import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { fetchChannels, actions } from '../slices/channels-slice';
import { useAuth } from '../components/auth-provider.jsx';

import Channel from '../components/channel.jsx';
import Message from '../components/message.jsx';
import getModal from '../modals';

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

  return (<Modal
    show={isModalShown}
    handleClose={handleClose}
    channels={channels}
    addChannel={addChannel}
    renameChannel={renameChannel}
    removeChannel={removeChannel}
    channelName={channelName} />);
};

const socket = io();

const Root = () => {
  const auth = useAuth();

  const [isModalShown, setModalShown] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [editingChannelId, setEditingChannelId] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { channels, currentChannelId, messages } = useSelector((store) => store.channels);

  const [usedChannelId, setChannel] = useState(currentChannelId);
  const loadChannels = async (token) => {
    dispatch(fetchChannels(token));
  };

  const handleAddChannel = () => {
    setModalType('adding');
    setModalShown(true);
  };

  const addChannel = ({ name }) => {
    dispatch(actions.addChannel({ name }));
    setModalShown(false);
  };

  const renameChannel = ({ text }) => {
    dispatch(actions.renameChannel({
      id: editingChannelId,
      name: text,
    }));
    setModalShown(false);
  };

  const removeChannel = () => {
    dispatch(actions.removeChannel({
      id: editingChannelId,
    }));
    setModalShown(false);
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
      loadChannels(token);
    }

    socket.on('newMessage', (payload) => {
      console.info(payload, 'newMessage event fired');
      dispatch(actions.addMessage(payload));
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  const changeChannel = (channelId) => (event) => {
    event.preventDefault();
    setChannel(channelId);
  };

  const [newMessage, setNewMessage] = useState('');
  const sendMessage = (event) => {
    event.preventDefault();

    socket.emit('newMessage', {
      body: newMessage,
      channelId: usedChannelId,
      username: auth.currentUser,
    });
    setNewMessage('');
  };
  const onMessageInput = (event) => {
    setNewMessage(event.target.value);
  };

  return (
    <div className="flex-grow-1 h-100 d-flex flex-column">
      <h1 className="mx-3">Hexlet chat</h1>

      <div className="row flex-grow-1">
        <div className="col-2 bg-light">
          <p className="d-flex align-items-center justify-content-between px-1 mb-2">
            Channels
            <button
              className="bg-light add-btn"
              aria-label="Add channel"
              onClick={handleAddChannel}>+</button>
          </p>

          <ul className="list-group">
            {channels.map((channel) => (
              <Channel
                key={channel.id}
                channel={channel}
                activeChannelId={usedChannelId}
                changeChannel={changeChannel}
                handleRename={openRenameModal}
                handleRemove={openRemoveModal} />
            ))}
          </ul>
        </div>

        <div className="col-10 bg-white d-flex flex-column ps-0">
          <div className="flex-grow-1">
            <ul className="list-group h-100 flex-column-reverse">
              {messages
                .filter(({ channelId }) => channelId === usedChannelId)
                .map(({ id, body, username }) => (
                  <Message
                    key={id}
                    text={body}
                    isHighlighted={username === auth.currentUser}
                    username={username} />
                ))}
            </ul>
          </div>

          <div className="pb-3">
            <form onSubmit={sendMessage}>
              <input
                className="w-100"
                maxLength="100"
                placeholder="Type your message..."
                value={newMessage}
                onInput={onMessageInput} />

              <input type="submit" value="Send" />
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
