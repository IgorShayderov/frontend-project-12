import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels-slice';
import messagesReducer from './messages-slice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
