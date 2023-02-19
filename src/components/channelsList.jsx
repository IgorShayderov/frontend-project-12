import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { actions as modalActions } from '../slices/modal-slice';
import { actions as channelsActions } from '../slices/channels-slice';

import Channel from './channel.jsx';

const ChannelsList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { channels, currentChannelId } = useSelector((store) => store.channels);

  const handleAddChannel = () => {
    dispatch(modalActions.openModal({ type: 'adding' }));
  };

  const openRenameModal = (channelId) => () => {
    dispatch(modalActions.openModal({ type: 'renaming', channelId }));
  };
  const openRemoveModal = (channelId) => () => {
    dispatch(modalActions.openModal({ type: 'removing', channelId }));
  };

  const changeChannel = (channelId) => (event) => {
    event.preventDefault();
    dispatch(channelsActions.setChannel(channelId));
  };

  return (
    <div className="col-2 bg-light">
      <p className="d-flex align-items-center justify-content-between px-1 mb-2">
        { t('channels') }
        <button
          className="bg-light add-btn"
          aria-label="Add channel"
          type="button"
          onClick={handleAddChannel}
        >
          +
        </button>
      </p>

      <ul className="list-group channels-list">
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            channel={channel}
            activeChannelId={currentChannelId}
            changeChannel={changeChannel}
            handleRename={openRenameModal}
            handleRemove={openRemoveModal}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsList;
