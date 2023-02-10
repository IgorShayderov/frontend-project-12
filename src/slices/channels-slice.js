/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import api from '../api';

export const fetchChannels = createAsyncThunk('data', async (token) => {
  const { data } = await api.getData(token);

  return data;
});

const initialState = {
  channels: [],
  currentChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannel: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addChannel: (state, { payload }) => {
      const { id } = payload;

      state.channels.push(payload);
      state.currentChannelId = id;
    },
    renameChannel: (state, { payload }) => {
      const { id } = payload;
      const renamableChannelIndex = state.channels.findIndex((channel) => channel.id === id);

      if (renamableChannelIndex !== -1) {
        state.channels.splice(renamableChannelIndex, 1, payload);
      }
    },
    removeChannel: (state, { payload }) => {
      const removableChannelIndex = state.channels.findIndex((channel) => channel.id === payload);

      if (removableChannelIndex !== -1) {
        state.channels.splice(removableChannelIndex, 1);

        const defaultChannelId = 1;

        if (state.currentChannelId === payload) {
          state.currentChannelId = defaultChannelId;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;

        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
