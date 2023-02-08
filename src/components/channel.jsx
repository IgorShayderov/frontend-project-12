/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import cn from 'classnames';
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
  const linkClasses = cn('channel-text', {
    'text-light': isActive,
  });

  const renderDropdown = () => (
    channel.removable ? (
      <Dropdown className="d-inline">
        <Dropdown.Toggle variant="white" className="border-0">
          <span className="visually-hidden">{ t('channel.management') }</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleRename(channel.id)}>{ t('channel.rename') }</Dropdown.Item>
          <Dropdown.Item onClick={handleRemove(channel.id)}>{ t('channel.remove') }</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    ) : null
  );

  return (
    <li className={channelClasses}>
      <a className={linkClasses} href="#" onClick={changeChannel(channel.id)}>
        #
        {' '}
        {channel.name}
      </a>

      { renderDropdown() }
    </li>
  );
};

export default Channel;
