import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const Channel = (props) => {
  const {
    channel,
    activeChannelId,
    changeChannel,
    handleRename,
    handleRemove,
  } = props;

  const { t } = useTranslation();
  const isActive = activeChannelId === channel.id;
  const channelClasses = cn(
    'list-group-item rounded-0',
    'd-flex justify-content-between align-items-center',
    {
      active: isActive,
    },
  );
  const linkClasses = cn({
    'text-light': isActive,
  });

  const renderDropdown = () => (
    channel.removable ? (<Dropdown className="d-inline">
      <Dropdown.Toggle variant="white" className="border-0" />

      <Dropdown.Menu>
        <Dropdown.Item onClick={handleRename(channel.id)}>{ t('channel.rename') }</Dropdown.Item>
        <Dropdown.Item onClick={handleRemove(channel.id)}>{ t('channel.remove') }</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>) : null
  );

  return (
    <li className={channelClasses}>
      <a className={linkClasses} href="#" onClick={changeChannel(channel.id)}>
        # {channel.name}
      </a>

      { renderDropdown() }
    </li>
  );
};

Channel.propTypes = {
  channel: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    removable: PropTypes.bool,
  }),
  activeChannelId: PropTypes.number,
  changeChannel: PropTypes.func,
  handleRename: PropTypes.func,
  handleRemove: PropTypes.func,
};

export default Channel;
