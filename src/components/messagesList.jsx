import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { useAuth } from './auth-provider.jsx';

import Message from './message.jsx';

const MessagesList = () => {
  const { currentChannelId } = useSelector((store) => store.channels);
  const { messages } = useSelector((store) => store.messages);
  const { currentUser } = useAuth();

  const messagesList = useRef(null);

  useEffect(() => {
    messagesList.current.scroll(0, messagesList.current.scrollHeight);
  }, [messagesList, messages.length]);

  return (
    <div className="flex-grow-1">
      <ul className="messages-list list-group h-100" ref={messagesList}>
        {messages
          .filter(({ channelId }) => channelId === currentChannelId)
          .map(({ id, body, username }) => (
            <Message
              key={id}
              text={body}
              isHighlighted={username === currentUser}
              username={username}
            />
          ))}
      </ul>
    </div>
  );
};

export default MessagesList;
