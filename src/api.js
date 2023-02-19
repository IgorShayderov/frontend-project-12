import axios from 'axios';
import io from 'socket.io-client';

axios.defaults.baseURL = 'api/v1';

const socket = io();

export default {
  signIn: ({ login, password }) => axios.post('login', {
    username: login,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    return { token, username };
  }),
  signUp: ({ login, password }) => axios.post('signup', {
    username: login,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    return { token, username };
  }),
  getData: ({ token }) => axios.get('data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
  addMessage: ({ body, channelId, username }) => socket.emit('newMessage', {
    body,
    channelId,
    username,
  }),
  createChannel: ({ name }) => socket.emit('newChannel', { name }),
  renameChannel: ({ id, name }) => socket.emit('renameChannel', { id, name }),
  removeChannel: ({ id }) => socket.emit('removeChannel', { id }),
  listenSocketEvent: (event, callback) => {
    socket.on(event, callback);
  },
};
