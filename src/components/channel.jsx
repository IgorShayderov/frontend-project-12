import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Channel = (props) => {
  const {
    id, name, activeChannelId, changeChannel,
  } = props;

  const isActive = activeChannelId === id;
  const channelClasses = cn('list-group-item', {
    active: isActive,
  });
  const linkClasses = cn({
    'text-light': isActive,
  });

  return (
    <li className={channelClasses}>
      <a className={linkClasses} href="#" onClick={changeChannel(id)}>
        {name}
      </a>
    </li>
  );
};

Channel.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  activeChannelId: PropTypes.number,
  changeChannel: PropTypes.func,
};

export default Channel;
