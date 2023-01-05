import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Message = (props) => {
  const { username, text, isHighlighted } = props;

  const messageClasses = cn('list-group-item border-0', {
    'bg-light': isHighlighted,
  });

  return (
    <li className={messageClasses}>
      { `${username}: ${text}` }
    </li>
  );
};

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string,
  isHighlighted: PropTypes.bool,
};

export default Message;
