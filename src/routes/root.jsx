import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { fetchChannels } from '../slices/channels-slice';

const Root = () => {
  const navigate = useNavigate();
  const { channels, currentChannelId, messages } = useSelector((store) => store.channels);

  const loadChannels = async (token) => {
    fetchChannels(token);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token === null) {
      console.info('navigate');
      navigate('/login');
    } else {
      loadChannels(token);
    }
  }, []);

  return (
    <main>
      <h1>Root page</h1>
    </main>
  );
};

export default Root;
