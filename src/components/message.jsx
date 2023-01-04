import React from 'react';

import PropTypes from 'prop-types';

const Message = (props) => {
  const { username, text } = props;

  return (
    <li className="list-group-item">
      { `${username}: ${text}` }
    </li>
  );
};

Message.propTypes = {
  username: PropTypes.string,
  text: PropTypes.string,
};

export default Message;
