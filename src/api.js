import axios from 'axios';

axios.defaults.baseURL = 'api/v1';

export default {
  signIn: ({ login, password }) => axios.post('login', {
    login,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    return { token, username };
  }),
  signUp: ({ login, password }) => axios.post('signup', {
    login,
    password,
  }).then(({ data }) => {
    const { token, username } = data;

    return { token, username };
  }),
  getData: (token) => axios.get('data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
};
