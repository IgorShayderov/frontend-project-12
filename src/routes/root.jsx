import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import { fetchChannels } from '../slices/channels-slice';

import Channel from '../components/channel.jsx';
import Message from '../components/message.jsx';

const socket = io();

const Root = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { channels, currentChannelId, messages } = useSelector((store) => store.channels);

  const [usedChannelId, setChannel] = useState(currentChannelId);
  const loadChannels = async (token) => {
    dispatch(fetchChannels(token));
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
      dispatch(fetchChannels(token));
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
    const username = localStorage.getItem('currentUser');
    event.preventDefault();

    socket.emit('newMessage', {
      body: newMessage,
      channelId: usedChannelId,
      username,
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
          <h2>Channels</h2>

          <ul className="list-group">
            {channels.map(({ id, name }) => (
              <Channel
                key={id}
                id={id}
                activeChannelId={usedChannelId}
                name={name}
                changeChannel={changeChannel} />
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
    </div>
  );
};

export default Root;
