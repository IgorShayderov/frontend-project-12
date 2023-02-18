import { useSelector } from 'react-redux';

import { useAuth } from './auth-provider.jsx';

import Message from './message.jsx';

const MessagesList = () => {
  const { currentChannelId } = useSelector((store) => store.channels);
  const { messages } = useSelector((store) => store.messages);
  const { currentUser } = useAuth();

  return (
    <div className="flex-grow-1">
      <ul className="list-group h-100 flex-column justify-content-end">
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
