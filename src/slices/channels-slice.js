import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchChannels = createAsyncThunk('data', async (token) => {
  const { data } = await axios.get('data', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
});

const initialState = {
  channels: [],
  currentChannelId: '',
  messages: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { channels, currentChannelId, messages } = action;

      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.messages = messages;
    });
  },
});

export default channelsSlice.reducer;
