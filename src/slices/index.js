import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels-slice';
import messagesReducer from './messages-slice';
import modalReducer from './modal-slice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
});
