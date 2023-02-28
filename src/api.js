import axios from 'axios';
import io from 'socket.io-client';

axios.defaults.baseURL = 'api/v1';
const unauthorizedStatus = 401;

axios.interceptors.response.use((response) => response, (error) => {
  if (error.response.status === unauthorizedStatus) {
    localStorage.removeItem('token');
  }
});

const socket = io();

const asyncronizeSocket = (fn) => (...args) => new Promise((resolve, reject) => {
  setTimeout(() => {
    reject();
  }, 3000);

  fn(...args, (response) => {
    resolve(response.data);
  });
});

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
  createChannel: asyncronizeSocket((...args) => socket.volatile.emit('newChannel', ...args)),
  renameChannel: asyncronizeSocket((...args) => socket.volatile.emit('renameChannel', ...args)),
  removeChannel: asyncronizeSocket((...args) => socket.volatile.emit('removeChannel', ...args)),
  listenSocketEvent: (event, callback) => {
    socket.on(event, callback);
  },
};
