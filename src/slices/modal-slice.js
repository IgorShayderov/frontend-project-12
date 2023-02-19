/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isShown: false,
  type: null,
  editingChannelId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal(state, { payload }) {
      const { type, channelId } = payload;

      state.type = type;
      state.editingChannelId = channelId;
      state.isShown = true;
    },
    closeModal(state) {
      state.type = null;
      state.editingChannelId = null;
      state.isShown = false;
    },
  },
});

export const { actions } = modalSlice;

export default modalSlice.reducer;
