import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channels-slice';

export default configureStore({
  reducer: {
    channels: channelsReducer,
  },
});
