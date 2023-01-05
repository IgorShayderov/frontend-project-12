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
  currentChannelId: 0,
  messages: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { channels, currentChannelId, messages } = action.payload;

      if (state.channels.length === 0) {
        state.channels = channels;
      }

      if (state.currentChannelId === 0) {
        state.currentChannelId = currentChannelId;
      }

      state.messages = messages;
    });
  },
});

export default channelsSlice.reducer;
