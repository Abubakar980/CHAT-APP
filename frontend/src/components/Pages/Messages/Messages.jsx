import Message from './Message';
import useConversation from '../../../zustand/useConversation';

const Messages = () => {
  const { messages } = useConversation();

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {messages.map((msg, idx) => (
        <Message key={idx} message={msg} />
      ))}
    </div>
  );
};

export default Messages;
