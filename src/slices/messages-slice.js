/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

import { actions as channelsActions, fetchChannels } from './channels-slice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter((message) => message.id !== payload);
      })
      .addCase(fetchChannels.fulfilled, (state, action) => {
        const { messages } = action.payload;

        state.messages = messages;
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
