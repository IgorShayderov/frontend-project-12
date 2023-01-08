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
      const { id, name } = payload;
      const renamableChannel = state.channels.find((channel) => channel.id === id);

      if (renamableChannel !== undefined) {
        renamableChannel.name = name;
      }
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;

      const removableChannelId = state.channels.findIndex((channel) => channel.id === id);

      if (removableChannelId !== -1) {
        state.channels.splice(removableChannelId, 1);
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
