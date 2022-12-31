import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';

const Root = () => {
  const navigate = useNavigate();
  const [, updateChannels] = useImmer({
    data: [],
    currentChannelId: null,
    messages: [],
  });

  const loadChannels = async (token) => {
    const { data } = await axios.get('data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { channels, currentChannelId, messages } = data;

    updateChannels({
      currentChannelId,
      channels,
      messages,
    });
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
