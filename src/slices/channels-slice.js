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
  currentChannelId: 1,
  messages: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    setChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      const { name } = payload;
      const lastChannelId = state.channels.at(-1)?.id || 0;
      const newId = lastChannelId + 1;

      state.channels.push({
        id: newId,
        name,
        removable: true,
      });
      state.currentChannelId = newId;
    },
    renameChannel: (state, { payload }) => {
      const { id } = payload;
      const renamableChannelIndex = state.channels.findIndex((channel) => channel.id === id);

      if (renamableChannelIndex !== -1) {
        state.channels.splice(renamableChannelIndex, 1, payload);
      }
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;

      const removableChannelIndex = state.channels.findIndex((channel) => channel.id === id);

      if (removableChannelIndex !== -1) {
        state.channels.splice(removableChannelIndex, 1);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannels.fulfilled, (state, action) => {
      const { channels, currentChannelId, messages } = action.payload;

      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.messages = messages;
    });
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
